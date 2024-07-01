const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/',async (req,res)=>{
console.log('Hi..');
res.send('Birds home page')
})

router.post('/signup', async (req,res) => {   
    const {username, email, password} = req.body
    const u = {username, email, password}
    console.log('signup')
    const user = new User(u)
    await user.save(u)
   
    return res.json(user)
    })
    

router.post('/login',async (req,res)=>{
    const {username, password} = req.body
    console.log('Login..');
    const user = await User.findOne({username, password})
    if(user)
        return res.status(200).json({message:'Sucess'})
    else
        return res.status(400).json({message:'Invalid Username or password'})
    })
    
    

router.get('/destroy',async (req,res)=>{
    console.log('Destroy..');
    res.send('Birds home page')
    })


router.get('/list', async (req,res) =>{
    const users =  await User.find({})
    console.log('list')
    console.log(users)
    return res.json(users)
})

module.exports = router;