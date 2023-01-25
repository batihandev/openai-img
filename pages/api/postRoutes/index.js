import { v2 as cloudinary } from 'cloudinary';
import Post from '../[mongodb]/models/post';
import connectDB from '../[mongodb]/connect';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
// export async function getServerSideProps() {
//   try {
//     connectDB(process.env.MONGODB_URL);
//     console.log('connected to mongodb');
//   } catch (err) {
//     console.log(error);
//   }
// }

export default async (req, res) => {
  await connectDB(process.env.MONGODB_URL);
  if (req.method === 'POST') {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });

      res.status(201).json({ success: true, data: newPost });
    } catch (err) {
      console.log(err);

      res.status(500).json({ success: false, message: error });
    }
  } else if (req.method === 'GET') {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).send({ message: 'Only POST/GET requests allowed' });
  }
};