const mongoose = require('mongoose');
const {connectDB, User, Admin} = require('./dbschema');

const seedDB = async() => {
    try{
        await connectDB();
        const user = await User.insertOne({
            username:"dipak",
            password:"1234",
            type:"user"
        })
        const admin = await Admin.insertOne({
            username:"saurav",
            password:"1234",
            type:"admin"
        })
        console.log('seeded database');
    }
    catch(err){
        console.log(err);
    }
}

seedDB();