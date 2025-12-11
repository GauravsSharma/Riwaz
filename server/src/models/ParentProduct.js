import mongoose from 'mongoose';

const parentProductSchema = new mongoose.Schema(
    {
        varients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // references the Product model
            default: [],
        }],
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store', // references the Product model
            required: true,

        },
        title: {
            type: String,
            required: true,
        },
        isParent: {
            type:Boolean,
            default:true
        },
    },

    {
        timestamps: true, // since Sequelize model had timestamps: false
    }
);

const ParentProduct = mongoose.model('ParentProduct', parentProductSchema);

export default ParentProduct;
