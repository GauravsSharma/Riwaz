import Product from '../models/product.js';
import Tag from '../models/tag.js';
import ProductImage from '../models/productImage.js';
import ProductVariant from '../models/productVariants.js';
import Store from '../models/store.js';
import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
import { getDiscountPercentage } from '../utils/helper.js';
import ParentProduct from '../models/ParentProduct.js';

// 06-11-25 test this api and create add prodcut as a variant api

export const createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      description,
      slug,
      fabric,
      work,
      type,
      tags = [],
      stock,
      color,
      price,
      originalPrice,
      parentId
    } = req.body;
    const user = req.user;

    const parent = await ParentProduct.findById(parentId).populate("storeId").session(session);
    if (!parent) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Parent not found.' });
    }
    if (parent.storeId.ownerId.toString() !== user.userId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not authorized to add products to this store.' });
    }

    const discountPercentage = getDiscountPercentage(originalPrice, price);
    // Generate slug if not provided
    const slugValue = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Create Product
    const newProduct = await Product.create(
      [{ title, description, slug: slugValue, fabric, work, type, stock, color, price,originalPrice,discountPercentage,parentId }],
      { session }
    );

    // Handle tags
    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName.trim().toLowerCase() }).session(session);
        if (!tag) {
          const [createdTag] = await Tag.create(
            [{ name: tagName.trim().toLowerCase() }],
            { session }
          );
          tag = createdTag;
        }
        return tag._id;
      })
    );

    // Link variant and tags to product
    parent.varients.push(newProduct[0]._id)
    newProduct[0].tags = tagIds;
    await newProduct[0].save({ session });
    await parent.save()

    await session.commitTransaction();
    const productWithRelations = await Product.findById(newProduct[0]._id)
      .populate('tags')
   
    return res.status(201).json({
      message: 'Product created successfully.',
      product: productWithRelations,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product.', error: error.message });
  } finally {
    session.endSession();
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const { productId } = req.params;
    const files = req.files;
    const meta_data = JSON.parse(req.body.meta_data);

    if (!productId) return res.status(400).json({ success: false, message: "productId is required" });
    if (!files?.length) return res.status(400).json({ success: false, message: "No images uploaded" });
    if (meta_data.length !== files.length)
      return res.status(400).json({ success: false, message: "meta_data and files count must match" });

    // later on task:- verify product belongs to the seller

    let product = await Product.findById(productId);
    let thumbnail = {
      url: "",
      public_id: ""
    }

    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = file.buffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`,
        { folder: "products" }
      );

      const imageDoc = await ProductImage.create({
        productId,
        url: result.secure_url,
        public_id: result.public_id,
        altText: meta_data[i].type || "",
        isPrimary: meta_data[i].type==="front",
      });
      if (meta_data[i].type === "front") {
        thumbnail.url = result.secure_url
        thumbnail.public_id = result.public_id
      }
      await imageDoc.save();
      uploadedImages.push(imageDoc._id);
    }

    product.images = uploadedImages
    product.thumbnail = thumbnail
    product.isActive = true
    await product.save()

    return res.status(201).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
}

export const getStoreProducts = async (req, res) => {
  try {
    const { storeId } = req.params;

    // If storeId is provided, verify store exists
    if (!storeId) {
      return res.status(404).json({
          success: false,
          message: 'StoreId not found'
        });
    }
     const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({
          success: false,
          message: 'Store not found'
        });
      }
      if(store.ownerId.toString() !== req.user.userId.toString()){
        return res.status(401).json({
          success: false,
          message: 'You are not authorized to view products of this store.'
        });
      }
      const storeProducts = await ParentProduct.find({ storeId }) 
        .limit(10)               
        .select('title price thumbnail stock _id isActive');

      console.log(storeProducts);

      if (!storeProducts.length) {
        return res.status(404).json({
          message: 'No products found in this store'
        });
      }

      return res.status(200).json({
        message: 'Store products retrieved successfully',
        count: storeProducts.length,
        products: storeProducts
      });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {

  try {
    const { productId } = req.params;
    const { title, description, fabric, work, type, stock, color, slug } = req.body;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'Product id not found'
      });
    }
    const product = await Product.findById(productId).populate("storeId images")
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }
    if (product.storeId.ownerId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to delete this product.'
      });
    }
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (fabric) {
      product.fabric = fabric;
    }
    if (slug) {
      product.slug = slug;
    }
    if (work) {
      product.work = work;
    }
    if (type) {
      product.type = type;
    }
    if (stock) {
      product.stock = stock;
    }
    if (color) {
      product.color = color;
    }
    await product.save();
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error ${error}`
    });

  }

}

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'Product id not found'
      });
    }
    const product = await Product.findById(productId).populate("images")
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }
    const parent = await ParentProduct.findById(product.parentId).populate("storeId")
    console.log(parent)
    if (parent.storeId.ownerId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to delete this product.'
      });
    }
    const images = product.images
    for (let image of images) {
      await cloudinary.uploader.destroy(image.public_id);
      await image.deleteOne();
    }
    const idx = parent.varients.map((v)=>v.toString()===productId);
    if(idx!==-1){
      parent.varients.splice(idx,1);
    }
    await parent.save();
    await product.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'Product deleted'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error ${error}`
    });
  }
}

// back to add variant tommorrow, it needs to be write for creating duplicate variants

export const addVariant = async (req, res) => {
  try {
    const { productIDs } = req.body;
    if (!Array.isArray(productIDs)) {
      return res.status(400).json({
        success: false,
        message: "ProductIds should be array."
      })
    }
    let products = []
    let productVariants = []
    for (let i = 0; i < productIDs.length; i++) {
      const pro = await Product.findById(productIDs[i]).populate("variants");
      products.push(pro)
    }
    for (let i = 0; i < productIDs.length; i++) {
      const productVariant = await ProductVariant.create({
        productId: products[i]._id,
        color: products[i].color,
        thumbnail: products[i].thumbnail,
        price: products[i]?.price || 1500,
        inStock: products[i].stock == 0 ? false : true
      })
      productVariants.push(productVariant)
    }

    for (let i = 0; i < productIDs.length; i++) {
      for (let j = 0; j < productIDs.length; j++) {
        if (i == j) continue;
        const idx = products[i].variants.findIndex((v) => v.color === productVariants[j].color)
        if (idx === -1) {
          products[i].variants.push(productVariants[j]._id);
        }
      }
    }
    const variants = [];
    for (let product of products) {
      const variant = product.variants
      variants.push({
        variant
      })
      await product.save();
    }
    return res.status(200).json({
      success: true,
      products: variants
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error."
    })
  }
}




