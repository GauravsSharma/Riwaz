import ParentProduct from "../models/ParentProduct.js";

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
    const {storeId} = req.params
    try {
        if(!storeId){
            return res.status(404).json({ success: false, message: 'StoreId needed' });
        }
        const parentProducts = await ParentProduct.find({storeId}).select("title varients isParent _id storeId").populate({
            path: "varients",
            select: "_id title thumbnail price status stock slug isActive"
        })
        console.log(parentProducts);
        
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

