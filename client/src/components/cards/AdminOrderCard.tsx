
import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  User,
  MapPin,
  CreditCard,
  Calendar,
  IndianRupee,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Image from 'next/image';

// Interfaces matching your backend schemas


interface AdminOrderCardProps {
  order: AdminOrder;
  onStatusUpdate: (orderId: string, newStatus: AdminOrder['orderStatus']) => Promise<void>;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { color: 'bg-green-100 text-green-800', icon: Package },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const paymentStatusConfig = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  if (!order || !order.orderStatus) {
    return null;
  }

  const StatusIcon = statusConfig[order?.orderStatus].icon;

  const handleStatusChange = async (newStatus: AdminOrder['orderStatus']) => {
    console.log("ab bolll");
    
    if (newStatus === order.orderStatus || order.isCancelled) return;

    setIsUpdating(true);
    try {
      await onStatusUpdate(order._id, newStatus);
      setSelectedStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIcon className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Status and Payment Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.orderStatus].color}`}>
            {order.orderStatus.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusConfig[order.paymentStatus]}`}>
            Payment: {order.paymentStatus.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {order.paymentMethod}
          </span>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-2">
            <User className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{order.userId.fullName}</p>
              <p className="text-xs text-gray-500">{order.userId.email}</p>
              <p className="text-xs text-gray-500">{order.userId.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <IndianRupee className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">₹{order.totalPrice.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                Items: ₹{order.itemsPrice} + Shipping: ₹{order.shippingPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Items ({order.orderItems.length})
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                width={64}
                height={64}
                  src={item.thumbnail}
                  alt={item.productId.title}
                  className="w-16 h-16 object-cover rounded border border-gray-200"
                />
                <p className="text-xs text-gray-600 mt-1 w-16 truncate">×{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status Update Section */}
        {!order.isCancelled && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Update Order Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['pending', 'confirmed', 'shipped', 'delivered'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={isUpdating || status === order.orderStatus}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedStatus === status
                      ? statusConfig[status].color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isUpdating && selectedStatus === status ? 'Updating...' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {order.isCancelled && order.cancelReason && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm font-medium text-red-800">Cancelled</p>
            <p className="text-xs text-red-600 mt-1">{order.cancelReason}</p>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-700">Shipping Address</p>
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.type.charAt(0).toUpperCase() + order.shippingAddress.type.slice(1)} Address
                  {order.shippingAddress.isDefault && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Default</span>}
                </p>
                <p className="mt-2">{order.shippingAddress.address}</p>
                <p>Landmark: {order.shippingAddress.landmark}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Order Items Details */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Order Items</p>
              <div className="space-y-2">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-3 bg-gray-50 rounded-md p-3">
                    <Image
                      width={80}
                height={80}
                      src={item.thumbnail}
                      alt={item.productId.title}
                      className="w-20 h-20 object-cover rounded border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.productId.title}</p>
                      <p className="text-xs text-gray-500 mt-1">Color: {item.color}</p>
                      <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-700">Payment Details</p>
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                </div>
                {order.paymentMode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <span className="font-medium text-gray-900">{order.paymentMode}</span>
                  </div>
                )}
                {order.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium text-gray-900 text-xs">{order.paymentId}</span>
                  </div>
                )}
                {order.razorpayOrderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Razorpay Order:</span>
                    <span className="font-medium text-gray-900 text-xs">{order.razorpayOrderId}</span>
                  </div>
                )}
              </div>
            </div>

            {order.deliveredAt && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Delivered At:</span> {formatDate(order.deliveredAt)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderCard;