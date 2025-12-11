import Store from "../models/store.js";

// ✅ CREATE a store
export const createStore = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        const ownerId = req.user.userId; // assuming req.user is set after auth

        if (!name || !description || !address) {
            return res.status(400).json({ message: "Some fields are missing." });
        }

        const newStore = await Store.create({
            ownerId,
            name,
            description,
            address,
        }).select("name description address _id")

        return res
            .status(201)
            .json({ message: "Store created successfully.", store: newStore });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Store creation failed.", error: error.message });
    }
};

// ✅ READ all stores of the logged-in user
export const getStores = async (req, res) => {
    try {
        const ownerId = req.user.userId; // from your auth middleware

        const stores = await Store.find({ ownerId }).select("name description address _id");

        return res.status(200).json({
            success: true,
            stores,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to fetch stores.", error: error.message });
    }
};

// ✅ READ a single store by ID
export const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        return res.status(200).json(store);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to fetch store.", error: error.message });
    }
};

// ✅ UPDATE a store
export const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, address } = req.body;

        const store = await Store.findById(id).populate('ownerId');

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        // only the owner can update
        if (store.ownerId._id.toString() !== req.user.userId.toString()) {
            return res
                .status(403)
                .json({ message: "You are not authorized to update this store." });
        }

        store.name = name || store.name;
        store.description = description || store.description;
        store.address = address || store.address;

        await store.save();

        return res
            .status(200)
            .json({ message: "Store updated successfully.", store });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to update store.", error: error.message });
    }
};

// ✅ DELETE a store
export const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id).populate('ownerId');

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }
        // console.log(store.ownerId._id, req.user.userId);
        
        // only the owner can delete
        if (store.ownerId._id.toString() !== req.user.userId.toString()) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this store." });
        }

        await store.deleteOne();

        return res.status(200).json({ message: "Store deleted successfully." });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to delete store.", error: error.message });
    }
};
