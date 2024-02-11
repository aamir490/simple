import mongoose from "mongoose";


const connectDb = async ()=>{
    mongoose.set('strictQuery', true)

    try{
        const{connection} = await mongoose.connect(process.env.MONGO_URL)
        if (connection.readystate == 1){
            console.log('db connected')
            return promise.resolve(true)
        }

    }catch(error){
        console.log('db disconnected')

        return promise.reject(error)
    }
}
export default connectDb