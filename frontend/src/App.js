// import React, { useState, useEffect } from 'react';
// import { Cloud, Droplets, Wind, Gauge, Search, MapPin } from 'lucide-react';

// export default function WeatherApp() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const API_BASE = 'http://localhost:3001/api';

//   const fetchWeather = async (cityName) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`${API_BASE}/weather/${encodeURIComponent(cityName)}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch weather');
//       }
//       const data = await response.json();
//       setWeather(data);
//     } catch (err) {
//       setError(err.message);
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWeatherByLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { latitude, longitude } = position.coords;
//           const response = await fetch(`${API_BASE}/weather/coords/${latitude}/${longitude}`);
//           if (!response.ok) throw new Error('Failed to fetch weather');
//           const data = await response.json();
//           setWeather(data);
//           setCity(data.city);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       },
//       () => {
//         setError('Unable to retrieve your location');
//         setLoading(false);
//       }
//     );
//   };

//   const handleSubmit = () => {
//     if (city.trim()) {
//       fetchWeather(city.trim());
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSubmit();
//     }
//   };

//   useEffect(() => {
//     fetchWeather('London'); 
//   }, []);

// return (
//     <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
//       <div className="w-full max-w-md">
//         <div className="bg-gray-300 rounded-3xl shadow-xl p-8 border border-gray-200">
//           <div className="flex items-center justify-center mb-6">
//             <Cloud className="w-10 h-10 text-gray-800 mr-3" />
//             <h1 className="text-3xl font-bold text-gray-900">QuickWeather</h1>
//           </div>

//           <div className="mb-6">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Enter city name..."
//                 className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-xl transition-all duration-200"
//               >
//                 <Search className="w-5 h-5 text-white" />
//               </button>
//               <button
//                 onClick={fetchWeatherByLocation}
//                 disabled={loading}
//                 className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-xl transition-all duration-200"
//               >
//                 <MapPin className="w-5 h-5 text-white" />
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//               <p className="text-red-600 text-center">{error}</p>
//             </div>
//           )}

//           {loading && (
//             <div className="text-center py-12">
//               <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//             </div>
//           )}

//           {weather && !loading && (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h2 className="text-4xl font-bold text-gray-900 mb-2">
//                   {weather.city}, {weather.country}
//                 </h2>
//                 <div className="flex items-center justify-center mb-4">
//                   <img
//                     src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
//                     alt={weather.description}
//                     className="w-32 h-32"
//                   />
//                 </div>
//                 <div className="text-7xl font-bold text-gray-900 mb-2">
//                   {weather.temperature}°C
//                 </div>
//                 <p className="text-xl text-gray-700 capitalize mb-1">
//                   {weather.description}
//                 </p>
//                 <p className="text-gray-500">
//                   Feels like {weather.feelsLike}°C
//                 </p>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                   <Droplets className="w-6 h-6 text-gray-600 mx-auto mb-2" />
//                   <p className="text-gray-500 text-sm text-center">Humidity</p>
//                   <p className="text-gray-900 text-xl font-semibold text-center">
//                     {weather.humidity}%
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                   <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
//                   <p className="text-gray-500 text-sm text-center">Wind</p>
//                   <p className="text-gray-900 text-xl font-semibold text-center">
//                     {weather.windSpeed} m/s
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                   <Gauge className="w-6 h-6 text-gray-600 mx-auto mb-2" />
//                   <p className="text-gray-500 text-sm text-center">Pressure</p>
//                   <p className="text-gray-900 text-xl font-semibold text-center">
//                     {weather.pressure} hPa
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Gauge, Search, MapPin } from 'lucide-react';

export default function WeatherApp() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

  // Fetch countries on component mount
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(res => res.json())
      .then(data => {
        const countryList = data
          .map(country => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      })
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      setStates([]);
      setCities([]);
      setSelectedState('');
      setSelectedCity('');
      
      fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
        headers: {
          'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
        }
      })
        .then(res => res.json())
        .then(data => {
          setStates(data || []);
        })
        .catch(err => console.error('Error fetching states:', err));
    }
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities([]);
      setSelectedCity('');
      
      fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, {
        headers: {
          'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
        }
      })
        .then(res => res.json())
        .then(data => {
          setCities(data || []);
        })
        .catch(err => console.error('Error fetching cities:', err));
    }
  }, [selectedCountry, selectedState]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/weather/${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`${API_BASE}/weather/coords/${latitude}/${longitude}`);
          if (!response.ok) throw new Error('Failed to fetch weather');
          const data = await response.json();
          setWeather(data);
          setSelectedCity(data.city);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  const handleSubmit = () => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  };

  useEffect(() => {
    fetchWeather('London'); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-300 rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-10 h-10 text-gray-800 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">QuickWeather</h1>
          </div>

          <div className="mb-6">
            <div className="space-y-3">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry || states.length === 0}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select State/Region</option>
                {states.map((state) => (
                  <option key={state.iso2} value={state.iso2}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState || cities.length === 0}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !selectedCity}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-xl transition-all duration-200 text-white font-semibold"
                >
                  <Search className="w-5 h-5 inline mr-2" />
                  Get Weather
                </button>
                <button
                  onClick={fetchWeatherByLocation}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-xl transition-all duration-200"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {weather && !loading && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {weather.city}, {weather.country}
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                    alt={weather.description}
                    className="w-32 h-32"
                  />
                </div>
                <div className="text-7xl font-bold text-gray-900 mb-2">
                  {weather.temperature}°C
                </div>
                <p className="text-xl text-gray-700 capitalize mb-1">
                  {weather.description}
                </p>
                <p className="text-gray-500">
                  Feels like {weather.feelsLike}°C
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <Droplets className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm text-center">Humidity</p>
                  <p className="text-gray-900 text-xl font-semibold text-center">
                    {weather.humidity}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm text-center">Wind</p>
                  <p className="text-gray-900 text-xl font-semibold text-center">
                    {weather.windSpeed} m/s
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <Gauge className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm text-center">Pressure</p>
                  <p className="text-gray-900 text-xl font-semibold text-center">
                    {weather.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
