const mongoose = require('mongoose')

// MongoDB connection
const mongoDBconnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_SERVER);
        console.log('MongoDB connected successfully'.bgCyan.black);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mongoDBconnection
