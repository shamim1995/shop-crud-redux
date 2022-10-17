
import mongoose from "mongoose"

const TagSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
        
        }
    

},{
    timestamps:true
})



//export 
export default mongoose.model('Tag', TagSchema)