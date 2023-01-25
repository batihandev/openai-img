//import backend from '../../data';
import connectDB from '../[mongodb]/connect';
try {
  // connectDB(process.env.MONGODB_URL);
} catch (error) {}
export default async (req, res) => {
  return res.status(200).json({ message: 'hello from server' });
};
