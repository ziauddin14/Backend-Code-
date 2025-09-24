    
  import mongoose from "mongoose";
  
  export const connectDB = (uri) =>
    mongoose
      .connect(uri)
      .then((c) => {
        console.log(`Connected DB: ${c.connection.name}`);
      })
      .catch((e) => console.log(e));
  
  