const express = require('express');
const app = express();
const cors = require('cors');
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
const PORT = 5000;
app.use(express.json());
app.use(cors());

async function run(loc) {
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
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.post('/cor', async (req, res) => {
  let coordinate = {};
  await run(req.body.loc).then((response) => {
    coordinate.cor = response;
    res.json(response);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
