
# Chatbot API

This is a simple chatbot API that uses the OpenAI API to generate chat responses.

## How to use

1. Clone the repository.
2. Install the dependencies:

```
npm install
```

3. Set the `API_KEY` environment variable to your OpenAI API key.
4. Run the server:

```
npm start
```

5. The API will be running on port 3005. You can send requests to the `/api/chat` endpoint. The request body should be a JSON object with the following properties:

```
{
  "prompt": "Your prompt"
}
```

The response will be a JSON object with the following properties:

```
{
  "assistantReply": "The assistant's reply"
}
```

## Example

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is the meaning of life?"
  }' \
  http://localhost:3005/api/chat
```

The response will be:

```
{
  "assistantReply": "The meaning of life is to live it to the fullest."
}
```

## License

This project is licensed under the MIT License.

