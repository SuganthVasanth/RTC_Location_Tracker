// busdetails.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the bus data type
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

export default function BusDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const busData = JSON.parse(params.busData as string) as BusData;

  // Extract source and destination from route
  const [source, destination] = busData.route.split(' - ');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Details</Text>
        <View style={{ width: 24 }} /> {/* Spacer for balance */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.pageTitle}>Bus details for {busData.vehicleNumber}</Text>
        
        {/* Route */}
        <View style={styles.routeContainer}>
          <Text style={styles.routeText}>{source} - {destination}</Text>
        </View>
        
        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle:</Text>
            <Text style={styles.detailValue}>{busData.vehicleNumber}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Location:</Text>
            <Text style={styles.detailValue}>{busData.currentLocation}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Source:</Text>
            <Text style={styles.detailValue}>{source}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dest:</Text>
            <Text style={styles.detailValue}>{destination}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Depart:</Text>
            <Text style={styles.detailValue}>{busData.departure}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ETA:</Text>
            <Text style={styles.detailValue}>{busData.arrival}</Text>
          </View>
        </View>
        
        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoText}>Via: {busData.via}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{busData.tag1}</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.trackButton]}>
            <Ionicons name="location" size={20} color="#fff" />
            <Text style={styles.buttonText}>Track Bus</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.shareButton]}>
            <Ionicons name="share-social" size={20} color="#007bff" />
            <Text style={[styles.buttonText, { color: '#007bff' }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  routeContainer: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  routeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  additionalInfoText: {
    fontSize: 16,
    color: '#666',
  },
  tag: {
    backgroundColor: '#feddac',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ff9800',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '48%',
  },
  trackButton: {
    backgroundColor: '#007bff',
  },
  shareButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#fff',
  },
});
