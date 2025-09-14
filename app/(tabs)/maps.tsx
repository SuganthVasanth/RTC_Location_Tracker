//maps.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

// Sample locations with coordinates
const locationsData = [
  { name: 'Tiruppur', latitude: 11.1085, longitude: 77.3411 },
  { name: 'Coimbatore', latitude: 11.0168, longitude: 76.9558 },
  { name: 'Salem', latitude: 11.6643, longitude: 78.1460 },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Madurai', latitude: 9.9252, longitude: 78.1198 },
];

const MapsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [executedSearch, setExecutedSearch] = useState('Tiruppur'); // default last searched
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 11.1085,
    longitude: 77.3411,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Update map when executedSearch changes
  useEffect(() => {
    const loc = locationsData.find(l => l.name.toLowerCase() === executedSearch.toLowerCase());
    if (loc) {
      setMapRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [executedSearch]);

  const handleSearchSelect = (location: string) => {
    setExecutedSearch(location);
    setSearchQuery(location);
    setDropdownVisible(false);
    setSearchFocused(false);
  };

  const prefixSuggestions =
    searchQuery.length > 0
      ? locationsData
          .filter(loc => loc.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
          .map(loc => loc.name)
      : [];

  const clearSearch = () => {
    setSearchQuery('');
    setExecutedSearch('');
    setDropdownVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Maps',
            headerStyle: { backgroundColor: '#007bff' },
            headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
          }}
        />

        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
        </MapView>

        {/* Search Bar Overlay */}
        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Places..."
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setDropdownVisible(true);
              }}
              onFocus={() => {
                setSearchFocused(true);
                setDropdownVisible(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
                setTimeout(() => setDropdownVisible(false), 200);
              }}
              onSubmitEditing={() => handleSearchSelect(searchQuery)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={{ marginLeft: 5 }}>
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          {isDropdownVisible && prefixSuggestions.length > 0 && (
            <View style={styles.dropdown}>
              <ScrollView>
                {prefixSuggestions.map((item, idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleSearchSelect(item)}>
                    <Text style={styles.dropdownOption}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="filter" size={20} color="#333" />
              <Text style={styles.controlText}>Sort by mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons name="location-sharp" size={16} color="#fff" />
              <Text style={styles.locationText}>{executedSearch || 'Tiruppur'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.locateButton}>
            <Ionicons name="navigate-circle-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.nearbyButton}>
            <Text style={styles.nearbyButtonText}>Locate nearby stops</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  topContainer: { position: 'absolute', top: 10, width: '100%', paddingHorizontal: 16, zIndex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  dropdownOption: { padding: 10, fontSize: 16, color: '#333' },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  controlText: { marginLeft: 5, color: '#333', fontWeight: 'bold' },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  locationText: { marginLeft: 5, color: '#fff', fontWeight: 'bold' },
  bottomControls: { position: 'absolute', bottom: 120, right: 15, alignItems: 'flex-end', zIndex: 1 },
  locateButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  nearbyButtonText: { color: '#555', fontWeight: 'bold' },
});

export default MapsScreen;
