import ParentProduct from "../models/ParentProduct.js";
import Store from "../models/store.js";
export const createParentProduct = async (req, res) => {
    try {
        const { title, varients = [] ,storeId} = req.body;
        if(!storeId){
            return  res.status(404).json({ success: false, message: 'StoreId not found.' });
        }
        const newParentProduct = await ParentProduct.create({
            title,
            varients,
            storeId
        });
        return res.status(201).json({
            success: true,
            parentProduct: newParentProduct,
        });
    }
    catch (error) {
        console.error('Error creating ParentProduct:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const getParentProducts = async (req, res) => {
   const userId = req.user.userId;
 
    try {
        const store = await Store.findOne({ ownerId: userId });
        if (!store) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        
        const parentProducts = await ParentProduct.find({storeId:store._id}).select("title varients isParent _id storeId").populate({
            path: "varients",
            select: "_id title originalPrice thumbnail price status parentId color stock slug fabric work description isActive type"
        })
       
        
        res.status(200).json({
            success: true,
            parentProducts,
        });
    }
    catch (error) {
        console.error('Error fetching ParentProducts:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

