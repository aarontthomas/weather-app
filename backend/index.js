import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// // Get weather by city name
// app.get('/api/weather/:city', async (req, res) => {
//   try {
//     const { city } = req.params;
//     const apiKey = process.env.OPENWEATHER_API_KEY;
    
//     if (!apiKey) {
//       return res.status(500).json({ error: 'API key not configured' });
//     }

//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//     );

//     const weatherData = {
//       city: response.data.name,
//       country: response.data.sys.country,
//       temperature: Math.round(response.data.main.temp),
//       feelsLike: Math.round(response.data.main.feels_like),
//       description: response.data.weather[0].description,
//       icon: response.data.weather[0].icon,
//       humidity: response.data.main.humidity,
//       windSpeed: response.data.wind.speed,
//       pressure: response.data.main.pressure
//     };

//     res.json(weatherData);
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       res.status(404).json({ error: 'City not found' });
//     } else {
//       res.status(500).json({ error: 'Failed to fetch weather data' });
//     }
//   }
// });

// // Get weather by coordinates
// app.get('/api/weather/coords/:lat/:lon', async (req, res) => {
//   try {
//     const { lat, lon } = req.params;
//     const apiKey = process.env.OPENWEATHER_API_KEY;
    
//     if (!apiKey) {
//       return res.status(500).json({ error: 'API key not configured' });
//     }

//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
//     );

//     const weatherData = {
//       city: response.data.name,
//       country: response.data.sys.country,
//       temperature: Math.round(response.data.main.temp),
//       feelsLike: Math.round(response.data.main.feels_like),
//       description: response.data.weather[0].description,
//       icon: response.data.weather[0].icon,
//       humidity: response.data.main.humidity,
//       windSpeed: response.data.wind.speed,
//       pressure: response.data.main.pressure
//     };

//     res.json(weatherData);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Weather API server running on port ${PORT}`);
// });


app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // First get coordinates from city name using Geocoding API
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { lat, lon, name, country } = geoResponse.data[0];

    // Now get weather using One Call API 3.0
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly,daily,alerts`
    );

    const weatherData = {
      city: name,
      country: country,
      temperature: Math.round(response.data.current.temp),
      feelsLike: Math.round(response.data.current.feels_like),
      description: response.data.current.weather[0].description,
      icon: response.data.current.weather[0].icon,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_speed,
      pressure: response.data.current.pressure
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

// Get weather by coordinates
app.get('/api/weather/coords/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Get weather using One Call API 3.0
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly,daily,alerts`
    );

    // Get city name from reverse geocoding
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    const cityName = geoResponse.data[0]?.name || 'Unknown';
    const countryCode = geoResponse.data[0]?.country || '';

    const weatherData = {
      city: cityName,
      country: countryCode,
      temperature: Math.round(response.data.current.temp),
      feelsLike: Math.round(response.data.current.feels_like),
      description: response.data.current.weather[0].description,
      icon: response.data.current.weather[0].icon,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_speed,
      pressure: response.data.current.pressure
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});