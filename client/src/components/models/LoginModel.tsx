import { useSendOtp, useVerifyOtp } from '@/hooks/useUser';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginModal({ isOpen, setIsOpen,becomeASeller }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,becomeASeller:boolean }) {
  //   const [isOpen, setIsOpen] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [receiveOffers, setReceiveOffers] = useState(true);
  const [showOptInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const handleClose = () => {
    setIsOpen(false);
  };


  const handleContinue = async () => {
    if (mobileNumber.length !== 10) {
      toast.error("Enter valid number");
      return;
    }
     
    console.log(mobileNumber+""+mobileNumber);

    sendOtpMutation.mutate(
      { phone: "+91" + mobileNumber },
      {
        onSuccess: () => {
          setShowOtpInput(true);
          toast.success("OTP sent!");
        },
        onError: (error) => toast.error(`Failed to send OTP: ${error}`),
      } 
    );
  };

  const handleSubmit = () => {
    verifyOtpMutation.mutate(
      {
        phone: "+91" + mobileNumber,
        otp,
        userType: becomeASeller ? "seller" : "customer",
      },
      {
        onSuccess: (res) => {
          toast.success("Login successful!");
          setIsOpen(false);
        },
        onError: () => toast.error("Invalid OTP"),
      }
    );
  };
  return (
    <>
      {
        isOpen && <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-sm shadow-xl max-w-xl w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal content */}
            <div className="p-8">
              {/* Welcome text */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Welcome Back!</p>
                <h2 className="text-xl font-semibold text-gray-900">
                  Login or Signup to your account
                </h2>
              </div>

              {/* Mobile number input */}
              <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-3">
                  MOBILE NUMBER <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-pink-200 focus-within:border-pink-300">
                  <div className="bg-gray-50 px-3 py-3 text-gray-700 border-r border-gray-300 text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobileNumber}
                    disabled={showOptInput}
                    maxLength={10}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
              {showOptInput && <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-3">
                  OTP <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-pink-200 focus-within:border-pink-300">

                  <input
                    type="tel"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="******"
                    className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                  <div className="bg-red-100 px-3 py-3 text-red-700 cursor-pointer font-semibold border-r border-gray-300 text-sm"
                    onClick={() => setShowOtpInput(false)}
                  >
                    CANCEL
                  </div>
                </div>
              </div>}

              {/* Checkbox */}
              <div className="mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receiveOffers}
                    onChange={(e) => setReceiveOffers(e.target.checked)}
                    className="mt-1 w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-600 leading-5">
                    Receive offers, and important account-related updates. T&C apply
                  </span>
                </label>
              </div>

              {/* Continue button */}
              {!showOptInput && <button
                onClick={handleContinue}
                className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-3 px-4 rounded-sm transition-colors duration-200 text-sm tracking-wide"
                disabled={!mobileNumber}
              >
                CONTINUE
              </button>}
              {showOptInput && <button
                onClick={handleSubmit}
                className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-3 px-4 rounded-sm transition-colors duration-200 text-sm tracking-wide"
                disabled={!otp}
              >
                Submit
              </button>}
            </div>
          </div>
        </div>
      }
    </>
  );
}