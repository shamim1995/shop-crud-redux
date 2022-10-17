
import mongoose from "mongoose"
const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug: {
        type: String,
        
    },
    
    photo:{
        type:String,
        default:'p.png'
    }


},{
    timestamps:true
})



//export 
export default mongoose.model('Category', categorySchema)