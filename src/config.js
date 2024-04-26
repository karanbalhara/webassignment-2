const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/ambulance", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Define the ambulance schema
const ambulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

    
});

// Create a model based on the ambulance schema
const collection = mongoose.model("user", ambulanceSchema);

module.exports = collection;
