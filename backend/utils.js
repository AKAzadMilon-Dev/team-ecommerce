var jwt = require('jsonwebtoken');

const grnaratetoken = (user)=>{
    return jwt.sign({user},process.env.JWT_SCRITE, { expiresIn: '30d'});
}

module.exports = grnaratetoken