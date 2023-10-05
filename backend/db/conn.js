const mongoose = require('mongoose');
const mongodb_Url = process.env.MONGO_URL;
mongoose.connect(mongodb_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((value) => {
    console.log("Mongodb (db) is connected successfully");
}).catch((err) => {
    console.log("Mongodb (db) is failed to connect : " + err);
})

module.exports = mongoose;