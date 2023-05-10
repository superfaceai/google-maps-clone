const express = require('express');
const app = express();
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
const PORT = 5000;
app.use(express.json());

async function geocodeLocation(loc) {
  // Load the profile
  const profile = await sdk.getProfile('address/geocoding@3.1.2');

  // Use the profile
  const result = await profile.getUseCase('Geocode').perform(
    {
      query: loc,
    },
    {
      provider: 'nominatim',
    }
  );

  // Handle the result
  const data = result.unwrap();
  return data;
}

app.get('/api/geocode', async (req, res) => {
  try {
    const location = req.query.location;
    const coordinates = await geocodeLocation(location);
    res.json({ location, coordinates });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/api/route', async (req, res) => {
  try {
    const locations = req.body.locations;
    if (locations.length !== 2) {
      res.status(422).json({ error: 'Expected 2 waypoints' });
      return;
    }
    const waypoints = await Promise.all(
      locations.map((location) => geocodeLocation(location))
    );
    res.json({ waypoints });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
