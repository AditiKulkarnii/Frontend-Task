const express = require('express');
const cors = require('cors');
const profilesData = require('./data/profiles.json');

const app = express();
const port = 5000;

app.use(cors());

// API to get profiles or a specific profile by ID
app.get('/api/profiles', (req, res) => {
  const { id } = req.query;
  if (id) {
    const profile = profilesData.find(p => p.id === parseInt(id));
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({ error: "Profile not found" });
    }
  } else {
    return res.status(200).json(profilesData);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
