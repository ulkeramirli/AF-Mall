import { useState, useEffect } from 'react';

export type WeatherState = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

export interface WeatherInfo {
  weather: WeatherState;
  temperature: number | null;
  windspeed: number | null;
  winddirection: number | null;
  isWindy: boolean;
  isAutumn: boolean;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  loading: boolean;
}

export function useWeather(): WeatherInfo {
  const [weather, setWeather] = useState<WeatherState>('cloudy');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [windspeed, setWindspeed] = useState<number | null>(null);
  const [winddirection, setWinddirection] = useState<number | null>(null);
  const [isWindy, setIsWindy] = useState(false);
  const [loading, setLoading] = useState(true);

  const month = new Date().getMonth();
  const season = (month >= 2 && month <= 4) ? 'spring'
    : (month >= 5 && month <= 7) ? 'summer'
    : (month >= 8 && month <= 10) ? 'autumn'
    : 'winter';
  const isAutumn = season === 'autumn';

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Fetch weather for Baku (latitude: 40.3777, longitude: 49.892)
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.3777&longitude=49.892&current_weather=true');
        const data = await res.json();
        
        if (data && data.current_weather) {
          const code = data.current_weather.weathercode;
          const temp = data.current_weather.temperature;
          const speed = data.current_weather.windspeed;
          const dir = data.current_weather.winddirection;
          
          setTemperature(typeof temp === 'number' ? temp : null);
          setWindspeed(typeof speed === 'number' ? speed : null);
          setWinddirection(typeof dir === 'number' ? dir : null);

          // Baku is known as the "City of Winds" (Küləklər şəhəri).
          // Wind speeds >= 18 km/h represent a fresh breeze or windy condition.
          const windy = typeof speed === 'number' && speed >= 18;
          setIsWindy(windy);

          // Map WMO codes & wind speed to states
          if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
            setWeather('snowy');
          } else if ((code >= 51 && code <= 67) || (code >= 95 && code <= 99)) {
            setWeather('rainy');
          } else if (windy) {
            setWeather('windy');
          } else if (code === 0 || code === 1) {
            setWeather('sunny');
          } else {
            setWeather('cloudy');
          }
        }
      } catch (error) {
        console.warn("Failed to fetch weather (possibly blocked by adblocker):", error);
        setWeather('cloudy');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return { 
    weather, 
    temperature, 
    windspeed, 
    winddirection, 
    isWindy, 
    isAutumn, 
    season, 
    loading 
  };
}
