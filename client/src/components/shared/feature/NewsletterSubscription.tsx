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
    <div className="bg-white py-12 px-6 sm:px-16 md:px-24">
      <div className="w-full mx-auto grid md:grid-cols-2 gap-15 items-center">
        {/* Left Side - Title and Description */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Coupons & Offers
          </h2>
          <p className="text-gray-600">
            You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
          </p>
        </div>

        {/* Right Side - Email Form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex">
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
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-r-md hover:bg-red-700 transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="text-sm text-gray-500">
              * Don&apos;t worry we don&apos;t spam.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;