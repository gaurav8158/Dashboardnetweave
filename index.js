const express = require("express");
const mongoose = require("mongoose");
const dataModel = require("./Models/dataModel");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI;
const jsonData = require("./jsondata.json");
mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
    return dataModel.insertMany(jsonData);
}).catch((err) => { console.log(err) })
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get('/api/data', async (req, res) => {
    console.log("mongodb Connected")
    try {
        const data = await dataModel.find().limit(100);
        res.send(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
})