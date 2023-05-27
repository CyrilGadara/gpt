import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

const apiKey = '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';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

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

    const { choices } = await response.json();
    const assistantReply = responseData.choices?.[0]?.message?.content || '';

    res.json({ assistantReply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Function to trigger the API call
const triggerApiCall = () => {
  // Place your API call logic here
  console.log('Triggering API call...');
};

// Function to start the interval timer
const startTimer = () => {
  timer = setInterval(triggerApiCall, 6000); // 10 minutes in milliseconds
};

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
