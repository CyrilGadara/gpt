import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_KEY);
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ]
    };

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    console.log('Processing Data...');
    const { choices } = await response.json();
    
    const assistantReply = choices[0]?.message?.content || '';
    console.log('JSON Generated');
    res.json({ assistantReply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
