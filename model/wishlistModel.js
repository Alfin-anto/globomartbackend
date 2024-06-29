const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    id:{
        type:Number,
        /* when 'unique = true', the wishlist item clash happens */
        required : true
    },
    title:{
        type:String,        
        required : true

    },
    price:{
        type:Number,        
        required : true
    },
    description:{
        type:String,        
        required : true
    },
    category:{
        type:String,        
        required : true
    },
    image:{
        type:String,        
        required : true
    },
    rating:{
        rate:{
        type:Number,        
        required : true
        },
        count:{
        type:Number,        
        required : true
        }
    },
    userId:{
        required:true,
        type:String
    }
})

const wishes = mongoose.model("wishes",wishlistSchema)

module.exports = wishes