import mongoose, { connect as _connect } from "mongoose";


export const dbConnect = async ()=>{
    try{
        const connect = await _connect(process.env.MONGO_URL);
        console.log(`connected DB at ${connect.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}
