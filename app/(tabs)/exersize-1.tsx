import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type WeatherData = {
  city: string;
  temperatureC: number;
  condition: string;
};

export default function App() {
  const [unit, setUnit] = useState('C');
  const [selectedCity, setSelectedCity] = useState('Saskatoon');

  const weatherData: WeatherData[] = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = (tempC: number): number => {
    return unit === 'C' ? tempC : ((tempC * 9) / 5 + 32);
  };

  const selectedWeather = weatherData.find(
    (data) => data.city === selectedCity
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>

      <Button
        title={`Toggle to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
        onPress={toggleUnit}
      />

      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select a city:</Text>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(city) => setSelectedCity(city)}
          style={styles.picker}
        >
          {weatherData.map((data) => (
            <Picker.Item
              key={data.city}
              label={data.city}
              value={data.city}
            />
          ))}
        </Picker>
      </View>

      {selectedWeather ? (
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{selectedWeather.city}</Text>
          <Text style={styles.condition}>{selectedWeather.condition}</Text>
          <Text style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: '#699ba2',
  },
  header: {
    fontSize: 34,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  selectorContainer: {
    marginVertical: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },

weatherCard: {
  padding: 20,
  borderRadius: 16,
  backgroundColor: '#fdfdfd',
  elevation: 6,

  alignItems: 'center',
},
city: {
  fontSize: 22,
  fontWeight: '700',
},
condition: {
  fontSize: 16,
  color: '#1976d2',
},
temperature: {
  fontSize: 26,
  fontWeight: '600',
},
  loading: {
    marginTop: 20,
    color: '#b4a6a6',
  },
});