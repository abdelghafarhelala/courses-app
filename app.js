require('dotenv').config();
const express = require('express');
var cors = require('cors');
const coursesRouter = require('./routes/courses.route');
const httpStatusText = require('./utils/httpStatusText');

const app = express();
const port = process.env.PORT || 4001;
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

app.use('/api/courses', coursesRouter);

app.all("/{*splat}", (req, res) => {
    res.status(404).json({ status: httpStatusText.FAIL, message: "Route not found", data: null });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ status:err.status || httpStatusText.ERROR, 
                                             message: err.message || "Internal Server Error", 
                                             data: err.data });
});

const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

