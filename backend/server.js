const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

//Importing routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 8000;


//connect to database
connectDB();

//Middlewares
app.use(cors()); //Cross Origin Resource Sharing
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Setting routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/tasks", taskRoutes);

//Routes
app.get("/", (req, res) => {
    res.json({ msg: "Hello from backend" });
})

//Start server
app.listen(PORT, () => console.log(`Server started on ${PORT}`))
