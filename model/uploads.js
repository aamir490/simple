import { Schema, model, models } from 'mongoose'
import mongoose from 'mongoose';

const Upload = new mongoose.Schema({
  
  image: {
    type: String,
    default: "/default.png",
    sparse: true,
  },
 
}, {
  timestamps: true,
});
// const Post =   models.Post || model("Post", PostSchema)
const UploadImage = models && models.Upload ? models.Upload : model("Upload", Upload);
export default UploadImage