// busdetails.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Constants from 'expo-constants';

// Define the type for the bus data
interface BusData {
  id: string;
  route: string;
  via: string;
  vehicleNumber: string;
  currentLocation: string;
  tag1: string;
  tag2: string;
  departure: string;
  arrival: string;
}

// Define the type for the stop data
interface StopData {
  id: string;
  name: string;
  isCurrent: boolean;
  eta: string;
}

// Sample bus stops data matching the image
const busStops: { [key: string]: StopData[] } = {
  '1': [
    { id: '1a', name: 'Ooty Bus Stand', isCurrent: false, eta: 'ETA' },
    { id: '1b', name: 'ATC', isCurrent: false, eta: 'ETA' },
    { id: '1c', name: 'Charring Cross', isCurrent: false, eta: 'ETA' },
    { id: '1d', name: 'Southwick', isCurrent: true, eta: 'Current Stop' },
    { id: '1e', name: 'Thalayathimund', isCurrent: false, eta: 'ETA' },
    { id: '1f', name: 'BF Junction', isCurrent: false, eta: 'ETA' },
    { id: '1g', name: 'Valley View', isCurrent: false, eta: 'ETA' },
    { id: '1h', name: 'Mandhada', isCurrent: false, eta: 'ETA' },
    { id: '1i', name: 'Ketti', isCurrent: false, eta: 'Arriving at 11:45 AM' },
  ],
};

const StopCard = ({ stop }: { stop: StopData }) => (
  <View style={styles.stopCard}>
    <View style={styles.stopTextContainer}>
      <Text style={[styles.stopName, stop.isCurrent && styles.currentStopText]}>
        {stop.name}
      </Text>
      <View style={[styles.etaTag, stop.isCurrent && styles.currentStopTag]}>
        <Text style={[styles.etaText, stop.isCurrent && styles.currentStopEtaText]}>
          {stop.eta}
        </Text>
      </View>
    </View>
  </View>
);

const BusDetailsScreen = () => {
  const router = useRouter();
  const { busData: busDataParam } = useLocalSearchParams();
  const busData = busDataParam ? JSON.parse(busDataParam as string) as BusData : null;

  // Use a static bus data to match the image
  const staticBusData = {
    id: '1',
    route: 'Ooty - Palani',
    via: 'Tiruppur',
    vehicleNumber: 'TN 33 N 6066',
    currentLocation: 'Coonoor',
    tag1: 'EXPRESS',
    tag2: '11:33 AM',
    departure: '11:40 AM',
    arrival: '5:25 PM',
  };

  const stops = busStops['1'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Custom Header to match the image */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CityConnect</Text>
          <View style={styles.liveTag}>
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Bus Info Card based on image */}
        <View style={styles.busInfoCard}>
          <View style={styles.cardHeader}>
            <View style={styles.routeContainer}>
              <Text style={styles.routeTitle}>{staticBusData.route}</Text>
              <Text style={styles.viaText}>via {staticBusData.via}</Text>
            </View>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, styles.tagExpress]}>
                <Text style={styles.tagText}>{staticBusData.tag1}</Text>
              </View>
              <View style={[styles.tag, styles.tagTime]}>
                <Text style={styles.tagText}>{staticBusData.tag2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.detailText}>Vehicle Number : {staticBusData.vehicleNumber}</Text>
            <Text style={styles.detailText}>Current Location : {staticBusData.currentLocation}</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabelDeparture}>Departure :</Text>
              <Text style={styles.footerTimeValue}>{staticBusData.departure}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabelArrival}>Arrival :</Text>
              <Text style={styles.footerTimeValue}>{staticBusData.arrival}</Text>
            </View>
          </View>
        </View>

        <View style={styles.stopsSection}>
          <Text style={styles.stopsTitle}>Bus Stops</Text>
          {stops.map((stop) => (
            <StopCard key={stop.id} stop={stop} />
          ))}
        </View>

        <TouchableOpacity style={styles.viewMapButton}>
          <Text style={styles.viewMapText}>View in maps</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  liveTag: {
    backgroundColor: '#ff5c5c',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  backButton: {
    marginRight: 10,
  },
  content: {
    padding: 16,
  },
  busInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    borderLeftWidth: 5, // Blue border on the left
    borderLeftColor: '#007bff', // Blue color
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viaText: {
    fontSize: 14,
    color: '#007bff', // Blue color for via text
    marginTop: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagExpress: {
    backgroundColor: '#ff9800',
  },
  tagTime: {
    backgroundColor: '#007bff',
  },
  cardBody: {
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0, // Remove borderTopWidth
    paddingTop: 5,
    paddingBottom: 1,
  },
  footerItem: {
    flexDirection: 'column',
  },
  footerLabelDeparture: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  footerLabelArrival: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  footerTimeValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 2,
  },
  stopsSection: {
    marginTop: 10,
  },
  stopsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 3,
  },
  stopTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopName: {
    fontSize: 16,
    color: '#333',
  },
  currentStopText: {
    fontWeight: 'bold',
    color: '#000',
  },
  etaTag: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#8BC34A',
    width:60,
    height:33,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  etaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  currentStopTag: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
    borderStyle: 'dotted',
    width:100,
  },
  currentStopEtaText: {
    color: 'red',
    fontWeight: 'bold',
  },
  viewMapButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viewMapText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusDetailsScreen;
