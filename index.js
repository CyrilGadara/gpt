import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Processing data...');
    const { prompt } = req.body;
    console.log(prompt);
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
    const { choices } = await response.json();
    
    const assistantReply = choices[0]?.message?.content || '';
    
    console.log(assistantReply)
    console.log('Resume JSON Generated Successfully');
    
    res.json({ assistantReply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
