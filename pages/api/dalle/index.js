import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

const openai = new OpenAIApi(configuration);

export default async (req, res) => {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    try {
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
        response_format: 'b64_json',
        quality: 'standard'
      });

      const image = aiResponse.data.data[0].b64_json;

      res.status(200).json({ photo: image });
    } catch (err) {
      res.status(500).send(err?.response.data.error.message);
    }
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
};
