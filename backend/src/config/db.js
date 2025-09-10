import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://admin:admin@cluster0.ckhcvux.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("db is connected");
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("error in connecting with db");
//   });

async function connectDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to db");
  } catch (e) {
    console.log(e);
    console.log("error in connecting db");
  }
}

connectDb();

export default connectDb;
