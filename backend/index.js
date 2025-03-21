const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {connectDB, User, Admin, Ticket} = require('./dbschema');
const {authMiddleware} = require('./middleware');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/user/register', async(req, res) => {
    const {username, password, email, mobile, role} = req.body;
    if(role !== 'user' && role !== 'admin'){
        res.status(400).json({message: 'Invalid role'});
    }
    if(!username || !password || !email || !mobile){
        res.status(400).json({message: 'All fields are required'});
    }

    switch(role){
        case 'user':
            const user = await User.findOne({username});
                if(user){
                    res.status(400).json({message: 'Username already exists'});
                }else{
                    const newUser = new User({username, password, email, mobile, type: role});
                    await newUser.save();
                    res.json({message: 'User registered successfully'});
                }
            break;
        case 'admin':
            const admin = await Admin.findOne({username});
            if(admin){
                res.status(400).json({message: 'Username already exists'});
            }else{
                const newAdmin = new Admin({username, password, email, mobile, type: role});
                await newAdmin.save();
                res.json({message: 'User registered successfully'});
            }
            break;
    }       

});

app.post('/login', async(req, res) => {
    const {username, password, type} = req.body;

    switch (type){
        case 'user':
            const user = await User.findOne({username});
        if(user){
            if(user.password === password){
                const token = jwt.sign({username,id:user._id}, process.env.JWT_SECRET);
                res.send({
                    message: 'login success', 
                    token,
                    username:user?.username,
                    email:user?.email,
                    mobile:user?.mobile
                });
            }
            else{
                res.send({message: 'invalid password'})
            }
        }
        else{
            res.send({message: 'user not found'})
        }
        break;

        case 'admin':
            const admin = await Admin.findOne({username});
            if(admin){
                if(admin.password === password){
                    const token = jwt.sign({username, id:admin._id}, process.env.JWT_SECRET);
                    res.send({
                        message: 'login success',
                        token,
                        username:admin?.username,
                        email:admin?.email,
                        mobile:admin?.mobile
                    });
                }
                else{
                    res.send({message: 'invalid password'})
                }
            }
            else{
                res.send({message: 'user not found'})
            }
        }
});

app.get('/getmatches',authMiddleware, async (req, res) => { 
    try {
        const matches = await Ticket.find({});
        res.send(matches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.sendStatus(500);
    }
});

app.post('/bookmatch', authMiddleware, async (req, res) => {
    const {ground, date, time, team1, team2, tickets} = req.body;
    if(!ground || !date || !time || !team1 || !team2 || !tickets){
        res.status(400).json({message: 'All fields are required'});
    }
    try {
        const match = await Ticket.create({
            userId:req.userId,
            ground,
            date,
            time,
            team1:team1.name,
            team2:team2.name,
            tickets:tickets.type,
            quantity:tickets.quantity
        });
        res.json({message: 'Match booked successfully'});
    } catch (error) {
        console.error("Error booking match:", error);
        res.sendStatus(500);
    }
});

app.get('/getbooking', authMiddleware, async (req, res) => {
    try {
        const match = await Ticket.find({userId: req.userId});
        if(match){
            res.json(match);
        }
        else{
            res.status(404).json({message: 'Match not found'});
        }
    } catch (error) {
        console.error("Error fetching match:", error);
        res.sendStatus(500);
    }
});

app.post('/canclebooking', authMiddleware, async (req, res) => {
    const {matchId} = req.body;
    if(!matchId){
        res.status(400).json({message: 'All fields are required'});
    }
    try {
        const match = await Ticket.findOne({_id: matchId, userId: req.userId});
        if(match){
            await match.deleteOne();
            res.json({message: 'Match cancelled successfully'});
        }
        else{
            res.status(404).json({message: 'Match not found'});
        }
    } catch (error) {
        console.error("Error cancelling match:", error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});