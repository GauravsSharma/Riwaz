declare global {
  interface Window {
    Razorpay: new (options: import("./types/razorpay").RazorpayOptions) => {
      open: () => void;
    };
  }
}
export {};