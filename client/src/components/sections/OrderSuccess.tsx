"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, Home, Eye } from 'lucide-react';

const OrderSuccessPage: React.FC<{
    orderId: string
}> = ({
    orderId
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Array<{id: number, left: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    // Create confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2
    }));
    setConfettiPieces(pieces);

    // Trigger animations
    setTimeout(() => setShowCheckmark(true), 300);
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  const handleContinueShopping = () => {
    window.location.href = '/';
  };

  const handleViewOrders = () => {
    window.location.href = '/orders';
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 overflow-hidden relative">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-300 opacity-20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Confetti Animation */}
      {showCheckmark && confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 bg-white opacity-80 rounded-full animate-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Large Animated Checkmark */}
          <div className="flex justify-center mb-8">
            <div className={`transition-all duration-1000 ${showCheckmark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'}`}>
              {/* Ripple effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white opacity-20 rounded-full animate-ping"></div>
              </div>
              
              {/* Main checkmark circle */}
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <CheckCircle2 
                  className="w-24 h-24 text-green-600"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Success Text */}
          <div className={`text-center transition-all duration-700 delay-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Order Placed!
            </h1>
            <p className="text-xl text-green-100 mb-3">
              Your order has been confirmed successfully
            </p>
            <p className="text-sm text-green-50 mb-8 opacity-90">
              We&apos;ll send you a confirmation email with all the details
            </p>

            {/* Order Summary Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">
              {/* Order Number */}
              <div className="mb-6 pb-6 border-b-2 border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Order Number</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-2xl font-bold text-gray-800 break-all">
                    #{orderId}
                  </p>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy Order ID"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Save this number for order tracking
                </p>
              </div>

              {/* Info Messages */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 mb-1">Check Your Email</p>
                    <p className="text-sm text-gray-600">
                      A confirmation email with order details has been sent to your registered email address
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-amber-50 p-4 rounded-xl">
                  <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                    <Eye className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 mb-1">Track Your Order</p>
                    <p className="text-sm text-gray-600">
                      You can track your order status anytime in the orders section
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleViewOrders}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View My Orders
                </button>
                
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-sm text-green-50 opacity-80">
              🎉 Thank you for shopping with us!
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-fall {
          animation: fall linear forwards;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;