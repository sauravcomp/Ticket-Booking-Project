const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connected to database');
    } catch(err){
        console.log(err);
    }
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:false
    },
    mobile:{
        type:Number,
        required:false
    }
});

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:false
    },
    mobile:{
        type:Number,
        required:false
    }
});

const TicketSchema = new mongoose.Schema({
    ground: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    team1: {
        name: {
            type: String,
            required: true,
        },
        captain: {
            type: String,
            required: true
        },
        coach: {
            type: String,
            required: true
        }
    },
    team2: {
        name: {
            type: String,
            required: true,
        },
        captain: {
            type: String,
            required: true
        },
        coach: {
            type: String,
            required: true
        }
    },
    tickets: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema); 
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = {
    connectDB,
    User,
    Admin,
    Ticket
}