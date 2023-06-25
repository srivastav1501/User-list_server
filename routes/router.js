const express = require('express')
const router = new express.Router();
const User = require('../models/userSchema.js')


// registedata

router.post("/add", async(req,res)=>{
    console.log(req.body);
    const {name,email,number}= req.body;

    if(!name|| !email|| !number){
        res.status(422).json({error:'fill all the data'});
    }

    try{
         const preUser = await User.findOne({email:email});

         if(preUser){
            res.status(422).json({error: 'User already exist'})
         }else{
            const finalUser = new User({name,email,number});

            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata)
         }
    }catch(error){
                console.log(error)
                res.status(400).json(error)
    }

})

router.get('/getUsers', async (req, res) => {
    try {
        const usersData = await User.find();
        // console.log('console the data' + usersData);
        res.status(201).json(usersData)
    } catch (error) {
        console.log('error' + error.message);
        res.status(400).json(error.message)
    }
})

router.put('/editUser/:id', async(req, res) => {
    try {
    const userId = req.params.id;
    const { name, email ,number} = req.body;
  
    console.log(userId,name,email,number);
    // Find the user by ID
    const user = await User.findOneAndUpdate({_id :userId},req.body,{new:true});
    //   console.log('user===',user)
    res.status(201).json(user)
    } catch(error) {
        res.status(400).json(error.message)
        // console.log("error------------" + error);
    }


  });

  
  router.delete('/deleteUser/:id',async(req,res)=>{
    const id = req.params.id;

    try{
           const doc = await User.findOneAndDelete({_id:id});
           res.status(201).json(doc)
    }catch(err){
         console.log(err);
         res.status(400).json(err);
    }
  })

module.exports = router;