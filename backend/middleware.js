const jwt  = require('jsonwebtoken');
const authMiddleware = async(req, res, next) =>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded?.id;
        next();
    }catch(err){
        res.send({message: 'unauthorized'})
    }
}

module.exports = {
    authMiddleware
}