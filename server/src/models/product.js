import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    // New attributes
    type: {
      type: String,
      enum: [
        'Baluchari', 'Banarasi', 'Bandhani', 'Embellished', 'Embroidery',
        'Floral Printed', 'Foil Printed', 'Jamdani', 'Kanjivaram', 'Lace',
        'Laheriya', 'Paithani', 'Patola', 'Plain', 'Printed', 'Sequence',
        'Swarovski', 'Warli Printed', 'Woven', 'Zari Stripe'
      ],
    },
    fabric: {
      type: String,
      enum: [
        'Chanderi', 'Chanderi Cotton', 'Chiffon', 'Chinnon', 'Cotton',
        'Cotton Blend', 'Cotton Silk', 'Georgette', 'Khadi', 'Linen',
        'Net', 'Organza', 'Satin', 'Shimmer', 'Shimmer Net', 'Silk',
        'Silk Blend', 'Tissue Cotton', 'Tissue Silk', 'Tussar Silk'
      ],
    },
    work: {
      type: String,
      enum: [
        'Bandhani', 'Dyed', 'Embellished', 'Embroidery', 'Floral Printed',
        'Foil Printed', 'Ikkat', 'Lace', 'Laheriya', 'Minakari', 'Patch Work',
        'Pearl Work', 'Printed', 'Sequence', 'Stone Work', 'Warli Printed',
        'Woven', 'Woven (Dual Tone)', 'Zari', 'Zari Stripe'
      ],
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParentProduct',
      required: true,
    },
    thumbnail: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      }
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage'
      }
    ],
    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      require: true
    },
    originalPrice: {
      type: Number,
      require: true
    },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text' });

productSchema.index({ type: 1, fabric: 1, work: 1 });


productSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;



