const mongoose = require('mongoose');
const {connectDB, User, Admin} = require('./dbschema');

const seedDB = async() => {
    try{
        await connectDB();
        const user = new User({
            username: 'dipakkhade',
            password: '123456',
            type: 'user'
        });
        const admin = new Admin({
            username: 'dipakkhade',
            password: '123456',
            type: 'admin'
        });
        await user.save();
        await admin.save();
        console.log('seeded database');
    }
    catch(err){
        console.log(err);
    }
}

seedDB();