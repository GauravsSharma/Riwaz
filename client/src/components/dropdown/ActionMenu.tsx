import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

const ActionMenu = ({ product, setIsUploadDialogOpen,setProductId,setIsDeleteDialogOpen}: {
   product: SellerProduct,
    setIsUploadDialogOpen: (open: boolean) => void,
    setProductId: (id: string) => void,
    setIsDeleteDialogOpen: (open: boolean) => void,
  }) => {
  const [open, setOpen] = useState(false);
  // const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  // const [productId, setProductId] = useState<string>("");
  const [position] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (open && buttonRef.current) {
  //     const rect = buttonRef.current.getBoundingClientRect();
  //     setPosition({
  //       top: rect.bottom + window.scrollY,
  //       left: rect.right + window.scrollX - 160, // 160px = menu width
  //     });
  //   }
  // }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center" ref={buttonRef}>
        <MoreVertical
          size={20}
          className="cursor-pointer text-gray-600 hover:text-black"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] w-40 bg-white border rounded-lg shadow-lg py-2"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {setProductId(product._id)}}
            >
              Edit Product
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {setProductId(product._id);setIsUploadDialogOpen(true);}}
            >
              Add Images
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {setProductId(product._id);setIsDeleteDialogOpen(true);}}
            >
              Delete Product
            </button>


          </div>,
          document.body
        )}
      
    </>
  );
};

export default ActionMenu;