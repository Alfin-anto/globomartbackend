const products = require('../model/productsModel')


exports.allProductController =async(req,res)=>{
    console.log('inside all product controller');
    try {
        const allproducts = await products.find()
        res.status(200).json(allproducts)

        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

exports.getAProductController = async(req,res)=>{
    const {id} = req.params
    console.log(id);

    try {
        const product = await products.findOne({id})
        res.status(200).json(product)
    } catch (error) {
        res.status(401).json(error)
        
    }

}