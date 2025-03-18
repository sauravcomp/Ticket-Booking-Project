const express = require('express');
const cors = require('cors');
const {connectDB, User, Admin} = require('./dbschema')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async(req, res) => {
    const {username, password, type} = req.body;
    if(type === 'user'){
        const user = await User.findOne({username});
        if(user){
            if(user.password === password){
                const token = jwt.sign({username}, process.env.JWT_SECRET);
                res.send({message: 'login success', token});
            }
            else{
                res.send({message: 'invalid password'})
            }
        }
        else{
            res.send({message: 'user not found'})
        }
    }
    else if(type === 'admin'){
        const admin = await Admin.findOne({username});
        if(admin){
            if(admin.password === password){
                const token = jwt.sign({username}, process.env.JWT_SECRET);
                res.send({message: 'login success', token});
            }
            else{
                res.send({message: 'invalid password'})
            }
        }
        else{
            res.send({message: 'user not found'})
        }
    }
    else{
        res.send({message: 'invalid login'})
    }
});

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});