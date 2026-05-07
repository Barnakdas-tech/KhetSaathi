// Simple weather API service
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

export async function fetchWeather(city) {
  // If no API key, return fake weather for demo
  if (!API_KEY) {
    console.warn("No Weather API key. Using mock weather data.");
    return {
      temp: 28,
      humidity: 60,
      rainfall: 5,
      condition: 'Sunny'
    };
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      rainfall: data.rain ? data.rain['1h'] || 0 : 0,
      condition: data.weather[0].main
    };
  } catch (error) {
    // Return default values if something goes wrong
    return { temp: 25, humidity: 50, rainfall: 0, condition: 'Clear' };
  }
}
