require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require('openai');

const app = express();

const client = new OpenAI({
  baseURL: 'https://llama8b.gaia.domains/v1',
  apiKey: '' // Leave this empty when using Gaia
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('It Work'));

app.get('/callopenai', async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "Meta-Llama-3-8B-Instruct-Q5_K_M",
      messages: [
        { role: "system", content: "You are a strategic reasoner." },
        { role: "user", content: "What is the purpose of life?" }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    console.log(response.choices[0].message.content);
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
