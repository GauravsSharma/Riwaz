import React from 'react'
import Cart_Card from '../cards/Cart_Card'

const ViewCartItems = ({
    items,
    totalAmount,
    setItem,
    setIsOpen
}:{
    items: CartItem[],
    totalAmount: number,
    setItem: React.Dispatch<React.SetStateAction<string | undefined>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  return (
    <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Shopping cart</h1>
                <div className="text-base md:text-lg font-semibold text-gray-900">
                  Total: ₹{totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Cart Item */}
              {
                items && items.length > 0 ? (
                  items.map((item, i) => (
                    <Cart_Card
                      key={item.productId + i}
                      title={item.title}
                      color={item.color}
                      price={item.unitPrice}
                      thumbnail={item.thumbnail}
                      quan={item.quantity}
                      productId={item.productId}
                      setItem={setItem}
                      setIsOpen={setIsOpen}
                      discountPercentage={item.discountPercentage}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">Your cart is empty.</div>
                )
              }
            </div>
          </div>
  )
}

export default ViewCartItems
