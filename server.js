const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Proxy route for GET requests
app.get('/api/proxy', async (req, res) => {
  const { url } = req.query; // Get the URL from query parameters
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from external API' });
  }
});

// Proxy route for POST requests
app.post('/api/proxy', async (req, res) => {
  const { url, data } = req.body; // Get URL and data from request body
  if (!url || !data) {
    return res.status(400).json({ error: 'URL and data are required' });
  }

  try {
    const response = await axios.post(url, data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error posting data to external API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
