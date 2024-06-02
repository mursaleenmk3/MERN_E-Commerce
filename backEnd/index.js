const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const mongoUri = "mongodb+srv://ecommerceMern:Mern1234@cluster0.rvfjahe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get("/", (req, res) => {
    res.send("Express App is running");
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, `${file.fieldname}_${uniqueSuffix}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({}).sort({ id: -1 }).limit(1);
        let id = products.length > 0 ? products[0].id + 1 : 1;

        const { name, image, category, new_price, old_price } = req.body;

        if (!name || !image || !category || new_price == null || old_price == null) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const product = new Product({ id, name, image, category, new_price, old_price });
        await product.save();
        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error adding product", error });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await Product.findOneAndDelete({ id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully", product });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Failed to remove product" });
    }
});

app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Existing user found with the same email address' });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({ name, email, password, cartData: cart });
        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ success: false, message: "Error signing up user", error });
    }
});

app.get('/newcollection', async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(0, 8); // Get the first 8 products
        res.json(newCollection);
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).json({ success: false, message: "Failed to fetch new collection", error });
    }
});

app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Wrong email address" });
        }

        const passMatch = req.body.password === user.password;
        if (!passMatch) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Failed to login", error });
    }
});

app.get('/popularproducts', async (req, res) => {
    try {
        let products = await Product.find({ category: "men" });
        let popularProducts = products.slice(0, 4);
        res.json(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).send("An error occurred while fetching popular products");
    }
});
// creating middlewear to fetch user
const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) {
    res.status(401).send({errors: "Please authenticate using valid login"})
    } else { 
    try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
    } catch (error){
    res.status(401).send({errors: "please autheticate using a valid token"});
    }
    }
}
// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId)
    try {
        let userData = await User.findOne({_id: req.user.id});

        // Initialize the cartData object if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Initialize the item in cartData if it doesn't exist
        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;
        }

        // Increment the item quantity
        userData.cartData[req.body.itemId] += 1;

        // Update the user document in the database
        await User.findOneAndUpdate(
            {_id: req.user.id},
            {cartData: userData.cartData}
        );

        // Send a JSON response
        res.json({message: "Added"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "An error occurred"});
    }
});

// creating endpoint for removing cartData
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId)
    let userData = await User.findOne({_id: req.user.id})
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed");
    })

// creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log('Get cart');
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!userData.cartData) {
            return res.json({}); // No cart data found for the user
        }
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ error: "An error occurred while fetching cart data" });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.error("Error starting the server:", error);
    }
});
