const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, } = req.body;


        // Create a new product
        const product = new Product({
            name, description, price, discountPrice, countInStock, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, user: req.user._id // Reference to the admin user who created it  
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct); // Respond with the created product

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("Server Error"); // Send a server error response
    }
});


// @route PUT /api/products/:id
// @desc Update an existing product by ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {

        const { name, description, price, discountPrice, countInStock, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, } = req.body;
        //find product by ID
        const product = await Product.findById(req.params.id);
        if (product) { 
            product.name = name || product.name;
            product.description = description || product.description; // Potential issue: should be product.description
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = size || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            //save the update    

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Chi tiết lỗi:", error); // Ghi lại toàn bộ lỗi trong console
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
    
});

module.exports = router;