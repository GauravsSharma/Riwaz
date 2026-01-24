// controllers/dashboardController.js
import Order from '../models/Order.js';
import Product from '../models/product.js';
import Store from '../models/store.js';
import ParentProduct from '../models/ParentProduct.js';
import mongoose from 'mongoose';

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId; // assuming you have auth middleware
    const userType = req.user.userType;

    // Build query filter based on user type
    let filter = {};

    if (userType === 'seller') {
      // For sellers, get their store first
      const store = await Store.findOne({ ownerId: userId });
      if (!store) {
        return res.status(404).json({
          success: false,
          message: 'Store not found for this seller'
        });
      }
      filter.storeId = store._id;
    }
    // For admin, no filter needed (gets all data)

    // ============== TOTAL REVENUE ==============
    const revenueResult = await Order.aggregate([
      {
        $match: {
          ...filter,
          orderStatus: { $ne: 'cancelled' },
          isCancelled: false
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    // ============== TOTAL ORDERS ==============
    const totalOrders = await Order.countDocuments(filter);

    // ============== TOTAL CUSTOMERS ==============
    let totalCustomers;

    if (userType === 'seller') {
      // Get unique customers who ordered from this store
      const customers = await Order.distinct('userId', filter);
      totalCustomers = customers.length;
    } else {

      const customers = await Order.distinct('userId');
      totalCustomers = customers.length;
    }

    let totalProducts;

    if (userType === 'seller') {
      // Get products for this seller's store
      const products = await ParentProduct.find(filter);
      const totalVariants = products.reduce(
        (sum, product) => sum + (product.varients?.length || 0),
        0
      );
      totalProducts = totalVariants;
    } else {

      totalProducts = await Product.countDocuments({ isActive: true });
    }

    res.status(200).json({
      success: true,
      stats: {
        revenue: totalRevenue,
        orders: totalOrders,
        customers: totalCustomers,
        products: totalProducts
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

export const getTopSellingProducts = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const store = await Store.findOne({ ownerId: adminId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const topProducts = await Order.aggregate([
      // 1️⃣ Match store orders
      {
        $match: {
          storeId: new mongoose.Types.ObjectId(store._id),
          orderStatus: { $ne: "cancelled" }
        }
      },

      // 2️⃣ Unwind order items
      { $unwind: "$orderItems" },

      // 3️⃣ Group by productId
      {
        $group: {
          _id: "$orderItems.productId",
          sales: { $sum: "$orderItems.quantity" },
          revenue: {
            $sum: {
              $multiply: [
                "$orderItems.quantity",
                "$orderItems.price"
              ]
            }
          }
        }
      },

      // 4️⃣ Sort by sales desc
      { $sort: { sales: -1 } },

      // 5️⃣ Limit top 3
      { $limit: 3 },

      // 6️⃣ Lookup product
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      // 7️⃣ Unwind product
      { $unwind: "$product" },

      // 8️⃣ Shape final output
      {
        $project: {
          _id: 0,
          name: "$product.title",
          sales: 1,
          revenue: 1,
          image: "$product.thumbnail.url"
        }
      }
    ]);

    // ✅ Return EXACT array type
    return res.status(200).json({ success: true, topProducts });

  } catch (error) {
    console.error("Top selling products error:", error);
    return res.status(500).json([]);
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const store = await Store.findOne({ ownerId: adminId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(store._id)) {
      return res.status(400).json([]);
    }

    // 📅 Last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrders = await Order.find({
      storeId: new mongoose.Types.ObjectId(store._id),
      createdAt: { $gte: sevenDaysAgo },
      orderStatus: { $ne: "cancelled" }
    })
      .populate("userId", "fullName")
      .sort({ createdAt: -1 })
      .lean();

    // 🔁 Shape data exactly for frontend
    const response = recentOrders.map(order => ({
      id: order._id.toString(),
      customer: order.userId?.fullName ?? "Unknown",
      amount: order.totalPrice,
      status: order.orderStatus,
      time: new Date(order.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })
    }));

    // ✅ Return ARRAY ONLY
    return res.status(200).json({
      success: true, orders: response
    });

  } catch (error) {
    console.error("Recent orders error:", error);
    return res.status(500).json({
      success: false, error: error.message
    });
  }
};


export const getLowStockProducts = async (req, res) => {
  try {
    const LOW_STOCK_LIMIT = 5;
    const THRESHOLD = 20;

    const parentProducts = await ParentProduct.find()
      .populate({
        path: "varients",
        select: "title stock isActive",
        match: {
          stock: { $lt: LOW_STOCK_LIMIT },
          isActive: true
        }
      })
      .lean();

    const lowStockItems = parentProducts.flatMap(parent =>
      parent.varients.map(variant => ({
        name: variant.title,
        stock: variant.stock,
        threshold: THRESHOLD
      }))
    );

    return res.status(200).json({ success: true, lowStockItems });

  } catch (error) {
    console.error("Low stock products error:", error);
    return res.status(500).json([]);
  }
};

// Get Store Sales Overview
export const getStoreSalesOverview = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const store = await Store.findOne({ ownerId: adminId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const storeId = store._id;

    // Total Sales
    const totalSales = await Order.aggregate([
      {
        $match: {
          storeId: storeId, // 👈 Direct use kiya, no ObjectId conversion needed
          orderStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Sales by Type (Banarasi, Bandhani, etc.)
    const salesByType = await Order.aggregate([
      {
        $match: {
          storeId: storeId,
          orderStatus: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$orderItems' },
      {
        $lookup: {
          from: 'products',
          localField: 'orderItems.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.type',
          totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          count: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    // Sales by Fabric
    const salesByFabric = await Order.aggregate([
      {
        $match: {
          storeId: storeId,
          orderStatus: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$orderItems' },
      {
        $lookup: {
          from: 'products',
          localField: 'orderItems.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.fabric',
          totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          count: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    // Sales by Work
    const salesByWork = await Order.aggregate([
      {
        $match: {
          storeId: storeId,
          orderStatus: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$orderItems' },
      {
        $lookup: {
          from: 'products',
          localField: 'orderItems.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.work',
          totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          count: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    // Sales by Color
    const salesByColor = await Order.aggregate([
      {
        $match: {
          storeId: storeId,
          orderStatus: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.color',
          totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          count: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 }
    ]);

    // Calculate percentages
    const grandTotal = totalSales[0]?.total || 0;

    const formatWithPercentage = (data) => {
      const colors = [
        'from-purple-500 to-purple-600',
        'from-blue-500 to-blue-600',
        'from-pink-500 to-pink-600',
        'from-orange-500 to-orange-600',
        'from-green-500 to-green-600',
        'from-indigo-500 to-indigo-600',
        'from-red-500 to-red-600',
        'from-teal-500 to-teal-600',
        'from-yellow-500 to-yellow-600',
        'from-cyan-500 to-cyan-600'
      ];

      return data.map((item, idx) => ({
        name: item._id || 'Unknown',
        sales: item.totalSales,
        count: item.count,
        percentage: grandTotal > 0 ? parseFloat(((item.totalSales / grandTotal) * 100).toFixed(1)) : 0,
        color: colors[idx % colors.length]
      }));
    };

    res.status(200).json({
      success: true,
      data: {
        totalSales: totalSales[0]?.total || 0,
        totalOrders: totalSales[0]?.count || 0,
        salesByType: formatWithPercentage(salesByType),
        salesByFabric: formatWithPercentage(salesByFabric),
        salesByWork: formatWithPercentage(salesByWork),
        salesByColor: formatWithPercentage(salesByColor),
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Revenue Overview (for graph)
export const getRevenueOverview = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const store = await Store.findOne({ ownerId: adminId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    const storeId = store._id;
    
    const { period } = req.query; // "7days", "30days", "3months"

    // Calculate date range based on period
    let startDate = new Date();
    let groupByFormat;
    
    switch(period) {
      case '7days':
        startDate.setDate(startDate.getDate() - 7);
        groupByFormat = { $dayOfWeek: '$createdAt' }; // 1=Sunday, 7=Saturday
        break;
      case '30days':
        startDate.setDate(startDate.getDate() - 30);
        groupByFormat = { $dayOfMonth: '$createdAt' };
        break;
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        groupByFormat = { 
          week: { $week: '$createdAt' },
          month: { $month: '$createdAt' }
        };
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
        groupByFormat = { $dayOfWeek: '$createdAt' };
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          storeId: storeId,
          orderStatus: { $ne: 'cancelled' },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: groupByFormat,
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Format data based on period
    let formattedData;
    
    if (period === '7days') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      formattedData = dayNames.map((day, idx) => {
        const dayData = revenueData.find(d => d._id === (idx + 1));
        return {
          day: day,
          revenue: dayData ? dayData.revenue : 0,
          orders: dayData ? dayData.orders : 0
        };
      });
    } 
    else if (period === '30days') {
      formattedData = Array.from({ length: 30 }, (_, i) => {
        const dayNum = i + 1;
        const dayData = revenueData.find(d => d._id === dayNum);
        return {
          day: `Day ${dayNum}`,
          revenue: dayData ? dayData.revenue : 0,
          orders: dayData ? dayData.orders : 0
        };
      });
    }
    else if (period === '3months') {
      // Group by week for 3 months view
      formattedData = revenueData.map(item => ({
        day: `Week ${item._id.week}`,
        month: item._id.month,
        revenue: item.revenue,
        orders: item.orders
      }));
    }

    // Calculate total revenue for the period
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);

    res.status(200).json({
      success: true,
      data: {
        period: period || '7days',
        totalRevenue,
        totalOrders,
        chartData: formattedData
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};