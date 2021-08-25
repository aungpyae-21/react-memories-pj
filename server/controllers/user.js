const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

exports.signUp = async(req,res) => {
    const{firstName, lastName, email, password, confirmPassword} = req.body
    // console.log(req.body)
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"Email is already exists"})
        if(password !== confirmPassword) return res.status(400).json({message:"Password don't match"})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const result =  await User.create({name:`${firstName} ${lastName}`, email,password:hashedPassword})
        const token = jwt.sign({email:result.email, id:result._id}, 'test',{expiresIn: "1h"})
        res.status(201).json({result,token})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.signIn = async(req,res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(400).json({message:"Email is not Found"})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Password is wrong"})
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'test', {expiresIn:"1h"})
        res.status(200).json({result:existingUser, token})
    } catch (error) {
        res.status(500).json({message:"Something is wrong"})
    }
}