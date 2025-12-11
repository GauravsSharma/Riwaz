"use client";
import React, { useState } from 'react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Email submitted:', email);
  };

  return (
    <div className="bg-gray-100 px-10 border-y border-gray-200">
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Get Coupons & Offers
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              You may unsubscribe at any moment. For that purpose, please find our contact 
              info in the legal notice.
            </p>
          </div>

          {/* Right Side - Email Form */}
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <span className="text-red-400 mr-1">*</span>
              Don't worry we don't spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;