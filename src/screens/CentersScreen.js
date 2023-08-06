import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location'; // Import expo-location

const MentalHealthScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [healthCenters, setHealthCenters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getLocationAsync(); // Call the function to get the user's location
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchMentalHealthCenters();
    }
  }, [userLocation]);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to get user location.');
    }
  };

  const fetchMentalHealthCenters = async () => {
    const API_KEY = 'AIzaSyAB4gZF2Zhm_fCGtew7vVM4FKTpxEA349E'; // Replace with your Google Maps API key
    const RADIUS = 5000;
    const KEYWORD = 'mental health center';

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=${RADIUS}&keyword=${KEYWORD}&key=${API_KEY}`
      );

      if (response.data.results) {
        const sortedHealthCenters = response.data.results.sort((a, b) => {
          if (b.rating === a.rating) {
            const distanceA = calculateDistanceInMiles(userLocation, a.geometry.location);
            const distanceB = calculateDistanceInMiles(userLocation, b.geometry.location);
            return distanceA - distanceB;
          }
          return b.rating - a.rating;
        });

        setHealthCenters(sortedHealthCenters);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch health centers.');
    }
  };

  const handleDirections = (latitude, longitude) => {
    const url = Platform.select({
      ios: `maps://?daddr=${latitude},${longitude}`,
      android: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const calculateDistanceInMiles = (userLocation, centerLocation) => {
    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = centerLocation.lat;
    const lon2 = centerLocation.lng;

    const R = 3958.8;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      {userLocation ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {healthCenters.map(center => (
              <Marker
                key={center.place_id} // Use the place_id as the key
                coordinate={{
                  latitude: center.geometry.location.lat,
                  longitude: center.geometry.location.lng,
                }}
                title={center.name}
                description={center.vicinity}
              />
            ))}
          </MapView>
          <View style={styles.healthCenterListContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {healthCenters.map(center => (
                <TouchableOpacity
                  key={center.place_id} // Use the place_id as the key
                  style={styles.healthCenterItem}
                  onPress={() =>
                    handleDirections(center.geometry.location.lat, center.geometry.location.lng)
                  }
                >
                  <Text style={styles.healthCenterName}>{center.name}</Text>
                  <Text style={styles.healthCenterAddress}>{center.vicinity}</Text>
                  <Text style={styles.healthCenterDistance}>
                    Distance: {calculateDistanceInMiles(userLocation, center.geometry.location)} miles
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 0.6,
  },
  healthCenterListContainer: {
    flex: 0.4,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  healthCenterItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  firstHealthCenter: {
    marginTop: 10,
  },
  healthCenterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3e3739'
  },
  healthCenterAddress: {
    fontSize: 14,
  },
  healthCenterDistance: {
    fontSize: 12,
    color: 'gray',
  },
  errorMessage: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default MentalHealthScreen;
