// map.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface StopDataWithCoords {
  id: string;
  name: string;
  isCurrent: boolean;
  eta: string;
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const router = useRouter();
  const { stops: stopsParam } = useLocalSearchParams();
  const stops = stopsParam ? JSON.parse(stopsParam as string) as StopDataWithCoords[] : [];
  
  // Calculate the initial region to center the map on the first stop
  const initialRegion = stops.length > 0
    ? {
      latitude: stops[0].latitude,
      longitude: stops[0].longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    : {
      latitude: 11.41,
      longitude: 76.68,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Bus Route',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
            pinColor={stop.isCurrent ? 'red' : 'green'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
