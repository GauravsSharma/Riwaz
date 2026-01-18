import React from 'react';
import { Package, Calendar, CreditCard, Truck, CheckCircle, Clock, XCircle, IndianRupee } from 'lucide-react';
import Image from 'next/image';



interface OrderCardProps {
  order: UserOrder;
  onViewDetails?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const getOrderStatusConfig = (status: UserOrder['orderStatus']) => {
    const configs = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        text: 'Pending',
      },
      confirmed: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        text: 'Confirmed',
      },
      processing: {
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Package,
        text: 'Processing',
      },
      shipped: {
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: Truck,
        text: 'Shipped',
      },
      delivered: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        text: 'Delivered',
      },
      cancelled: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        text: 'Cancelled',
      },
    };
    return configs[status] || configs.pending;
  };

  const getPaymentStatusConfig = (status: Order['paymentStatus']) => {
    const configs = {
      pending: { color: 'text-yellow-600', text: 'Pending' },
      paid: { color: 'text-green-600', text: 'Paid' },
      failed: { color: 'text-red-600', text: 'Failed' },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const orderStatusConfig = getOrderStatusConfig(order.orderStatus);
  const paymentStatusConfig = getPaymentStatusConfig(order.paymentStatus);
  const StatusIcon = orderStatusConfig.icon;

  const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border w-full border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-semibold text-gray-800 text-lg">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
          <div className={`px-4 py-2 rounded-full border-2 ${orderStatusConfig.color} flex items-center gap-2`}>
            <StatusIcon className="w-4 h-4" />
            <span className="font-semibold text-sm">{orderStatusConfig.text}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Order Items Preview */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Items ({totalItems})</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {order.orderItems.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                {item.thumbnail ? (
                  <Image
                    width={64}
                    height={64}
                    src={item.thumbnail}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  {item.color && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Color:</span>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  )}
                </div>
                <p className="font-semibold text-gray-800 flex items-center">
                  <IndianRupee className="w-4 h-4" />
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            {order.orderItems.length > 3 && (
              <p className="text-sm text-gray-500 text-center py-2">
                +{order.orderItems.length - 3} more items
              </p>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {order.deliveredAt && (
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Expected Delivery</p>
                <p className="font-medium text-gray-800">{formatDate(order.deliveredAt)}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium text-gray-800">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className={`font-medium ${paymentStatusConfig.color}`}>
                {paymentStatusConfig.text}
              </p>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-800 flex items-center">
              <IndianRupee className="w-6 h-6" />
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {onViewDetails && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(order._id)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md hover:shadow-lg"
          >
            View Order Details
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;