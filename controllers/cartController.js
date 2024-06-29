const carts = require('../model/cartModel')

exports.addToCartController = async (req, res) => {
    console.log('inside addToCartController');
    const userId = req.payload
    console.log(userId);

    const { id, title, price, description, category, image, rating, quantity } = req.body

    try {
        const exisitingProduct = await carts.findOne({ id, userId })
        if (exisitingProduct) {

            exisitingProduct.quantity += 1

            exisitingProduct.grandTotal = exisitingProduct.quantity * exisitingProduct.price

            await exisitingProduct.save()
            res.status(200).json(exisitingProduct)
        }
        else {
            const newProduct = new carts({
                id, title, price, description, category, image, rating, userId, quantity, grandTotal: price
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)

    }
}

exports.getAllItemsCart = async(req, res) =>{
    console.log('inside getAllItemsCart controller');
    const userId = req.payload
    console.log(userId);

    try {                     
        const allProducts = await carts.find({userId})
        res.status(200).json(allProducts)
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }

}

exports.removeItemCart = async(req, res)=>{
    const {id} = req.params
    console.log(id);
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json('deleted the item successfully')
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }
}

exports.emptyCartController = async(req, res) =>{
    const userId = req.payload
    console.log(userId);
    try {
        await carts.deleteMany({userId})
        res.status(200).json('deleted the items successfully')
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }
}

exports.incrementProductController = async(req, res) =>{
    const {id} = req.params
    try {
        const selectedItem = await carts.findOne({_id:id})

        if(selectedItem){
            selectedItem.quantity+=1
            selectedItem.grandTotal = selectedItem.price * selectedItem.quantity
            await selectedItem.save()
            res.status(200).json(selectedItem)
        }
        else{
            res.status(406).json('no such product')
        }
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }
}

exports.decrementProductController = async(req, res) =>{
    const {id} = req.params
    try {
        const selectedItem = await carts.findOne({_id:id})

        if(selectedItem){
            selectedItem.quantity-=1
            if(selectedItem.quantity==0){
                await carts.deleteOne({_id:id})
                res.status(200).json('item removed')

            }
            else{
                selectedItem.grandTotal = selectedItem.price * selectedItem.quantity
                await selectedItem.save()
                res.status(200).json(selectedItem)
            }
        }
        else{
            res.status(406).json('no such product')
        }
        
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
        
    }

}