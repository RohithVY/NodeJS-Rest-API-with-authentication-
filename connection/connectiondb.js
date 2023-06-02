const mongoose = require('mongoose');

const connectionDB = async () => {

try{
    const DBConnection = await mongoose.connect(process.env.MONGO_REMOTE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // console.log(`connected to db in host : ${DBConnection.connection.host}`);
} catch (error){
    console.log(error.message);
    process.exit(1);
}
}

module.exports = connectionDB;