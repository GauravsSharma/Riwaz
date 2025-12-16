import ExploreCategoryCard from "./ExploreCategoryCard";


export default function SareeCategorySection() {
  const categories = [
    {
      url: "/images/banarsi.webp",
      title: "Banarasi",
      description: "Timeless elegance woven in silk",
      gradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      url: "/images/baluchari.jpg",
      title: "Baluchari",
      description: "Stories woven in every thread",
      gradient: "from-amber-600/20 to-red-600/20"
    },
    {
      url: "/images/kanjeevaram.jpg",
      title: "Kanjivaram",
      description: "South Indian silk heritage",
      gradient: "from-emerald-600/20 to-teal-600/20"
    },
    {
      url: "/images/paithani.jpg",
      title: "Paithani",
      description: "Maharashtrian artistry at its finest",
      gradient: "from-fuchsia-600/20 to-purple-600/20"
    },
    {
      url: "/images/bhandhni.webp",
      title: "Bandhani",
      description: "Vibrant tie-dye traditions",
      gradient: "from-rose-600/20 to-orange-600/20"
    },
    {
      url: "/images/chanderi.jpg",
      title: "Chanderi",
      description: "Sheer elegance from Madhya Pradesh",
      gradient: "from-blue-600/20 to-indigo-600/20"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/30 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl fraunces font-medium text-gray-900 mb-2 sm:mb-4 tracking-tight">
           Fashion Frenzy Arrivals
          </h1>
          <p className="text-gray-600 text-md sm:text-lg max-w-2xl mx-auto leading-6">
            Discover the finest handcrafted sarees from across India, each telling a unique story of tradition and craftsmanship
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((item, index) => (
            <ExploreCategoryCard
              key={index} 
              url={item.url} 
              title={item.title}
              description={item.description}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}