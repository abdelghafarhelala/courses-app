const express = require('express');
const coursesRouter = require('./routes/courses.route');
const app = express();
const port = 4001;
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/courses',coursesRouter);

const uri = "mongodb+srv://abdo:iYsLuAHKYArke9D@cluster0.h8a3xmg.mongodb.net/courses?appName=Cluster0";
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

