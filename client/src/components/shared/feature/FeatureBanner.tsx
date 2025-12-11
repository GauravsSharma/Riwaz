import { Award, Shield, RotateCcw } from "lucide-react";

export default function FeaturesBanner() {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "All the clothing products are made from 100% premium quality fabric."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Highly Secured SSL-Protected Payment Gateway."
    },
    {
      icon: RotateCcw,
      title: "7 Days Return",
      description: "Return or exchange the orders within 7 days of delivery."
    }
  ];

  return (
    <div className="border-t border-slate-200 py-12 px-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-zinc-500">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}