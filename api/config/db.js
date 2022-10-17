import mongoose from "mongoose";
import colors from 'colors'

//create a mongodb connection 

const mongoDbConnection = async () => {

    try{
        const connect = await mongoose.connect(process.env.MONGO_STRING)

        console.log(`Mongo Db Connected Successfully HOST: ${connect.connection.host}`.bgBlue.black);
        

    }catch(error){
        console.log(`${error}`);
    }

}

export default mongoDbConnection;
    