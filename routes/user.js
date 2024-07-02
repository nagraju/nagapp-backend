const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const authenticateJwt = require('../middlewares/auth')
const jwt = require('jsonwebtoken')

router.get('/',async (req,res)=>{
console.log('Hi..');
res.send('Birds home page')
})

router.post('/signup',  async (req,res) => {   
    const {username, email, password} = req.body
    const u = {username, email, password}
    console.log('signup')
    const user = new User(u)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save(u)
   
    return res.json(user)
    })
    

router.post('/login', async (req,res)=>{
    const {username, password} = req.body
    console.log('Login..');
    const user = await User.findOne({username})

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        const payload = {
            user: {
                id: user.id,
            }
        }
        console.log('Matched')
        try{
          const token = jwt.sign(payload, "nag8888", { expiresIn: "1h" });
          console.log("Matched..");

          if (token) return res.json({ message: "Successful login", token });
        }
        catch(err){        
            console.log('Error..')
            console.log('Failed in token generation', err)        
        }
    }
    else
        return res.status(400).json({message:'Invalid Username or password'})
    })
    
    

router.delete('/destroy',async (req,res)=>{
    console.log('Destroy..'+req.body.id);
    const r = await User.deleteOne({_id:req.body.id})
    console.log(r)
    res.json('deleted')
})

router.get('/get-user-data',authenticateJwt, async (req,res)=>{
    const user_id = req.user.id
    const user = await User.findOne({_id: user_id})
    res.json({message:'secured page',userDetails:{username:user.username, email:user.email}})
})

router.get('/list', async (req,res) =>{
    const users =  await User.find({})
    console.log('list')
    console.log(users)
    return res.json(users)
})

module.exports = router;