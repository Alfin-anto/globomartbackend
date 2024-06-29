const express = require('express')
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const router = new express.Router()
const wishlistController = require('./controllers/wishlistController')
const cartController = require('./controllers/cartController')

//all product
router.get('/all-product', productController.allProductController)

//register path

router.post('/user/register',userController.registerController)

//login

router.post('/user/login', userController.loginController)  

//add to wishlist

router.post('/add-wishlist', jwtMiddleware, wishlistController.addToWishlistController)

//get a product
router.get('/get-product/:id', productController.getAProductController)

//get wishlist item
router.get('/wishlist/all-product', jwtMiddleware, wishlistController.getWishlistItemController)

//remove item from wishlist 
router.delete('/remove-wishlistItem/:id', jwtMiddleware, wishlistController.removeItemController)

//path to add items to cart

router.post('/add-cart', jwtMiddleware, cartController.addToCartController)

//get to get all products from cart
router.get('/cart/all-products', jwtMiddleware, cartController.getAllItemsCart)

//path to delete cart item 
router.delete('/cart/remove-item/:id', jwtMiddleware, cartController.removeItemCart)

//path to empty the cart
router.delete('/empty-cart', jwtMiddleware, cartController.emptyCartController)

//path to increment product
router.get('/cart/increment/:id', jwtMiddleware, cartController.incrementProductController)

//path to decrement product
router.get('/cart/decrement/:id', jwtMiddleware, cartController.decrementProductController) 

module.exports = router  