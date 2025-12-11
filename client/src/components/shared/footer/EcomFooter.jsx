import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EcomFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-6">COMPANY</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help Section */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-6">NEED HELP FROM POWERLOOK</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/returns" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Returns, Exchange & Refunds
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-6">SUPPORT</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <Link href="mailto:support@powerlook.in" className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                  support@powerlook.in
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <Link href="tel:+919696333000" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">
                  +91 9696333000
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-gray-600 text-sm">Mon - Sat : 10:30 AM - 06:00 PM</span>
              </div>
            </div>
          </div>

          {/* Registered Office Section */}
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-6">REGISTERED OFFICE ADDRESS</h3>
            <div className="text-gray-600 leading-relaxed">
              <p className="font-medium">Powerlook Apparels Pvt Ltd</p>
              <p className="mt-2 text-sm">
                Lotus Corporate Park Wing G02 - 1502, Ram Mandir Lane, off Western Express Highway, Goregaon, Mumbai, 400063
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h4 className="text-lg font-medium text-gray-900">Experience The Powerlook App</h4>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="block">
                <div className="w-40 h-12 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Get it on Google Play</span>
                </div>
              </Link>
              <Link href="#" className="block">
                <div className="w-40 h-12 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Download on App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Social Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-900 font-medium">100% Secure Payment</span>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 border rounded flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">GPay</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 border rounded flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">UPI</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 border rounded flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">COD</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-medium">Join The Power Squad</span>
              <div className="flex space-x-3">
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories Expandable Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button className="w-full py-4 flex items-center justify-between text-left">
            <span className="text-lg font-medium text-gray-900">Popular Categories</span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6">
        <Link href="#" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </Link>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © 2025 www.powerlook.in. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EcomFooter;