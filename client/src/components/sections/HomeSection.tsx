import ProductCard from "../cards/ProductCard";

interface Props {
  products: Product[];
  title: string;
  discription: string;
}

export default function HomeSections({ products,title,discription }: Props) {
  return (
    <div>

      {/* ⭐ Beautiful New Arrivals Section */}
      <div className="md:px-10 py-16 ">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl fraunces font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="text-md text-gray-600 mt-1 sm:mt-2">
           {discription}
          </p>        
        </div>

        {/* Product Grid */}
        <div className="flex justify-center flex-wrap gap-y-2 sm:gap-2">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              image={product.thumbnail.url}
              originalPrice={product.originalPrice}
              discount={product.discountPercentage}
              price={product.price}
        
              id={product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
