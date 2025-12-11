import { Phone, MessageCircle, Mail } from 'lucide-react';
export default function ContactUs() {
  return (
    <div className=" bg-gray-50 py-16 md:px-20 px-5 lg:px-24 md:pb-40">
      <div className="">
        {/* Main heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Contact Us</h1>
        </div>

        {/* Contact options grid */}
        <div className="flex flex-wrap justify-between items-center">
          
          {/* Call Now */}
          <div className="text">
            <div className="flex justify-start mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                <Phone className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Call Now</h2>
            <div className="w-8 h-0.5 bg-red-700 mb-4"></div>
            <p className="text-red-700 font-medium text-lg mb-3">+91 969-6333-000</p>
            <p className="text-gray-700 font-medium text-sm">Mon - Sat : 10:30 am - 06:00 pm</p>
          </div>

          {/* Chat Now */}
          <div className="">
            <div className="flex justify-start mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                <MessageCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Chat Now</h2>
            <div className="w-8 h-0.5 bg-red-700 mb-4"></div>
            <p className="text-red-700 font-medium text-lg mb-3 cursor-pointer hover:underline">
              Chat with us.
            </p>
            <p className="text-gray-700 font-medium text-sm">Mon - Sat : 10:30 am - 06:00 pm</p>
          </div>

          {/* Drop an Email */}
          <div className="">
            <div className="flex justify-start mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                <Mail className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Drop an Email</h2>
            <div className="w-8 h-0.5 bg-red-700 mb-4"></div>
            <p className="text-red-700 font-medium text-lg mb-3 cursor-pointer hover:underline">
              support@powerlook.in
            </p>
            <p className="text-gray-700 font-medium text-sm">We will try to revert you ASAP.</p>
          </div>

        </div>
      </div>

      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200">
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.325"/>
          </svg>
        </button>
      </div>
    </div>
  );
}