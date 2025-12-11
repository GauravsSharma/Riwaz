import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // reference to Product model
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '',
    },
    thumbnail:{
      url:{
        type: String,
        required: true,
      },
      public_id:{
        type: String,
        required: true,
      }
    },
    price:{
      type: Number,
      required:true,
    },
  },
  {
    timestamps: false, // same as Sequelize config
  }
);

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;




// 1 - update create product route to add variants with images 
// add products 
// create search index 
// query docs 
