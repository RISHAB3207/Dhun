const mongoose =require("mongoose");

mongoose.connect(process.env.MONGODB_URI,{
    // useNewUrlParser:true,
    // useUnifiedTopeology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(`connection successfull`);
}).catch((e)=>{
    console.log(e);
})