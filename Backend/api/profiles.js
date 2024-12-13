const profiles = require('../data/profiles.json');

module.exports = (req, res) => {
  const { query } = req;
  if (query.id) {
    const profile = profiles.find(p => p.name !== "New User" && p.id === parseInt(query.id));
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } else {
    res.status(200).json(profiles);
  }
};
