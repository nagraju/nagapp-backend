const jwt = require('jsonwebtoken')

const authenticateJwt = (req,res,next) => {
    const {authtoken} = req.headers
    console.log('Toke'+req.headers)

    if(!authtoken)
        return res.status(500).json({message:'Request without Token'})
    
    const tokenDetails = jwt.verify(authtoken,'nag8888')
    if(!tokenDetails)
        return res.status(500).json({message:'Invalid Token'}) 
    req.user = tokenDetails.user
    next()


}

module.exports = authenticateJwt