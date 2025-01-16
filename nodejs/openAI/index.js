require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require('openai');
const fs = require("fs");

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

app.get('/getName', async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "Meta-Llama-3-8B-Instruct-Q5_K_M",
      messages: [
        { role: "system", content: "You are good at names." },
        { role: "user", content: "Give me a name" }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    fs.appendFileSync("history.txt", response.choices[0].message.content + "\n");
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/loadNames', async (req, res) => {
  try {
    const loadedHistory = fs.readFileSync("history.txt", "utf8");

    res.json({ data: loadedHistory });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/read-image-byurl', async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "Meta-Llama-3-8B-Instruct-Q5_K_M",
      messages: [
        { role: "system", content: "You are an artist" },
        {
          role: "user",
          content: [
            { type: "text", text: "What's in this image?" },
            {
              type: "image_url",
              image_url: {
                url: "https://images.unsplash.com/photo-1483004406427-6acb078d1f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8fDI%3D"
              }
            }
          ]
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

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
