const express = require('express');
const app = express();
const cors = require('cors');
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
const PORT = 5000;
app.use(express.json());
app.use(cors());

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

app.post('/cor', async (req, res) => {
  console.log(req.body);
  let coordinate = {};
  await geocodeLocation(req.body.loc).then((response) => {
    coordinate.cor = response;
    console.log(response);
    if (response) {
      res.json({ response: response, status: 200 });
    } else {
      res.json({ status: 400 });
    }
  });
});

app.post('/route', async (req, res) => {
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
