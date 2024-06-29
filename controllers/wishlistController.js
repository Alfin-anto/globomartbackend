const { json } = require("express");
const wishes = require("../model/wishlistModel");


exports.addToWishlistController = async(req, res)=>{
    const userId = req.payload
    console.log(userId);

    const {id, title, price, description, category, image, rating } = req.body

    try {

        const existingProduct = await wishes.findOne({id, userId})
        if(existingProduct){
            res.status(406).json('Product already in your wishlist')

        }
        else{
            const newProduct = new wishes({
                id, title,price,description,category, image, rating, userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
        



    } catch (error) {
        res.status(401),json(`request failed due to ${error}`) 
        
    }
}

exports.getWishlistItemController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);

    try {
        const wishlistItems = await wishes.find({userId})
        res.status(200).json(wishlistItems)

    } catch (error) {
        res.status(401).json(error)

        }
}

exports.removeItemController = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const removeItem = await wishes.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}