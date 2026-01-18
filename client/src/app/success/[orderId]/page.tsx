"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrderSuccessPage from "@/components/sections/OrderSuccess";
// Import your API client
// import api from "@/lib/axios";
// import { AxiosError } from "axios";
import { Loader2, AlertCircle } from "lucide-react";
import api from "@/lib/axios";
import { AxiosError } from "axios";

type VerificationState = "loading" | "success" | "error" | "not_found";

interface ErrorDetails {
  message: string;
  canRetry: boolean;
}

export default function Page() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const [state, setState] = useState<VerificationState>("loading");
  const [error, setError] = useState<ErrorDetails | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 2;

  useEffect(() => {
    if (!orderId) {
      setState("error");
      setError({
        message: "Invalid order ID",
        canRetry: false,
      });
      return;
    }

    const verifyOrder = async () => {
      try {
        setState("loading");
        setError(null);

        const res = await api.get(`/order/${orderId}/verify`, {
          timeout: 10000, // 10 second timeout
        });

        if (process.env.NODE_ENV === "development") {
          console.log("🔍 Order verification response:", res.data);
        }

        if (!res.data?.success) {
          setState("not_found");
          setError({
            message: "Order not found or already verified",
            canRetry: false,
          });
          return;
        }

        setState("success");
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        
        if (process.env.NODE_ENV === "development") {
          console.error("❌ Order verification error:", {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            message: axiosError.message,
          });
        }

        // Handle specific error cases
        if (axiosError.code === "ECONNABORTED") {
          setState("error");
          setError({
            message: "Request timed out. Please check your connection.",
            canRetry: true,
          });
        } else if (axiosError.response?.status === 404) {
          setState("not_found");
          setError({
            message: "Order not found",
            canRetry: false,
          });
        } else if (axiosError.response?.status === 429) {
          setState("error");
          setError({
            message: "Too many requests. Please try again later.",
            canRetry: true,
          });
        } else if (axiosError.response?.status && axiosError.response.status >= 500) {
          setState("error");
          setError({
            message: "Server error. Please try again in a moment.",
            canRetry: true,
          });
        } else if (!navigator.onLine) {
          setState("error");
          setError({
            message: "No internet connection. Please check your network.",
            canRetry: true,
          });
        } else {
          setState("error");
          setError({
            message: axiosError.response?.data?.message || "Something went wrong",
            canRetry: retryCount < MAX_RETRIES,
          });
        }
      }
    };

    verifyOrder();
  }, [orderId, retryCount]);

  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  // Loading state
  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Verifying your order
            </h2>
            <p className="text-gray-600">Please wait a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error states
  if (state === "error" || state === "not_found") {
    const isNotFound = state === "not_found";
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
              isNotFound ? "bg-yellow-100" : "bg-red-100"
            }`}>
              <AlertCircle className={`w-8 h-8 ${
                isNotFound ? "text-yellow-600" : "text-red-600"
              }`} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {isNotFound ? "Order Not Found" : "Verification Failed"}
              </h2>
              <p className="text-gray-600">
                {error?.message || "Unable to verify your order"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleGoHome}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Go to Home
              </button>
              
              {error?.canRetry && retryCount < MAX_RETRIES && (
                <button
                  onClick={handleRetry}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Try Again {retryCount > 0 && `(${MAX_RETRIES - retryCount} left)`}
                </button>
              )}
            </div>

            {retryCount >= MAX_RETRIES && error?.canRetry && (
              <p className="text-sm text-gray-500 pt-2">
                Maximum retry attempts reached. Please contact support if the problem persists.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Success state - render the actual order success page
  return <OrderSuccessPage orderId={orderId} />;
}