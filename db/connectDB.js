import mongoose from 'mongoose';

// no try catch because we have own error handler middleware
const connectDB = async () => {
  console.log('Connecing to Mongo...: ');

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true
  });

  console.log('MongoDB connected');
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
};

export default connectDB;
