import { useState, useEffect } from 'react';

export type WeatherState = 'sunny' | 'cloudy' | 'rainy' | 'snowy';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherState>('cloudy');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Fetch weather for Baku
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.3777&longitude=49.892&current_weather=true');
        const data = await res.json();
        
        if (data && data.current_weather) {
          const code = data.current_weather.weathercode;
          
          // Map WMO codes to our states
          if (code === 0 || code === 1) {
            setWeather('sunny');
          } else if (code >= 51 && code <= 67) {
            setWeather('rainy');
          } else if (code >= 95 && code <= 99) {
            setWeather('rainy');
          } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
            setWeather('snowy');
          } else {
            // Default to cloudy for codes like 2, 3, 45, 48, and 80-82 (showers)
            setWeather('cloudy');
          }
        }
      } catch (error) {
        // Use console.warn instead of console.error to prevent Next.js from 
        // showing the error overlay if an adblocker blocks the weather API.
        console.warn("Failed to fetch weather (possibly blocked by adblocker):", error);
        setWeather('cloudy'); // Fallback
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return { weather, loading };
}
