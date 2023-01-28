import mongoose from 'mongoose';
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});
let PostSchema;
try {
  PostSchema = mongoose.model('Post', Post);
} catch {}

export default PostSchema;
