// index.tsx
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Sample bus data
const allBusData = [
  { id: '1', route: 'Ooty - Palani', via: 'Tiruppur', vehicleNumber: 'TN 43 N 0916', currentLocation: 'Coonoor', tag1: 'EXPRESS', tag2: '11:33 AM', departure: '11:40 AM', arrival: '5:25 PM' },
  { id: '2', route: 'Coimbatore - Chennai', via: 'Salem', vehicleNumber: 'TN 01 Z 5678', currentLocation: 'Salem', tag1: 'AC', tag2: '10:00 PM', departure: '10:30 PM', arrival: '5:00 AM' },
  { id: '3', route: 'Madurai - Kanyakumari', via: 'Thirunelveli', vehicleNumber: 'TN 58 B 1234', currentLocation: 'Thirunelveli', tag1: 'DELUXE', tag2: '08:00 AM', departure: '08:15 AM', arrival: '01:30 PM' },
  { id: '4', route: 'Coimbatore - Town', via: 'RS Puram', vehicleNumber: 'TN 38 Z 1010', currentLocation: 'Gandhipuram', tag1: 'TOWN', tag2: '09:00 AM', departure: '09:15 AM', arrival: '09:45 AM' },
  { id: '5', route: 'Pollachi - Udumalpet', via: 'Palani', vehicleNumber: 'TN 42 B 2020', currentLocation: 'Palani', tag1: 'ORDINARY', tag2: '02:00 PM', departure: '02:15 PM', arrival: '03:00 PM' },
  { id: '6', route: 'Chennai - Puducherry', via: 'ECR', vehicleNumber: 'TN 01 E 3030', currentLocation: 'ECR Checkpost', tag1: 'POINT TO POINT', tag2: '11:00 AM', departure: '11:30 AM', arrival: '02:30 PM' },
  { id: '7', route: 'Tiruppur - Erode', via: 'Perundurai', vehicleNumber: 'TN 45 A 7077', currentLocation: 'Chennimalai', tag1: 'EXPRESS', tag2: '08:45 AM', departure: '09:00 AM', arrival: '10:15 AM' },
  { id: '8', route: 'Coimbatore - Town Hall', via: 'RS Puram', vehicleNumber: 'TN 38 T 8181', currentLocation: 'Gandhipuram', tag1: 'TOWN', tag2: '07:30 AM', departure: '07:45 AM', arrival: '08:10 AM' },
  { id: '9', route: 'Salem - Tiruchirappalli', via: 'Namakkal', vehicleNumber: 'TN 54 E 9292', currentLocation: 'Namakkal', tag1: 'ORDINARY', tag2: '04:15 PM', departure: '04:30 PM', arrival: '07:00 PM' },
  { id: '10', route: 'Kovai - Bangalore', via: 'Hosur', vehicleNumber: 'TN 01 E 5050', currentLocation: 'Krishnagiri', tag1: 'AC', tag2: '11:00 PM', departure: '11:30 PM', arrival: '05:00 AM' },
  { id: '11', route: 'Dindigul - Theni', via: 'Batalagundu', vehicleNumber: 'TN 57 F 6363', currentLocation: 'Vedasandur', tag1: 'EXPRESS', tag2: '09:00 AM', departure: '09:10 AM', arrival: '10:45 AM' },
  { id: '12', route: 'Ooty - Karur', via: 'Tiruppur', vehicleNumber: 'TN 43 N 1008', currentLocation: 'Coonoor', tag1: 'EXPRESS', tag2: '11:33 AM', departure: '11:40 AM', arrival: '5:25 PM' },
  { id: '13', route: 'Ooty - Trichy', via: 'Tiruppur', vehicleNumber: 'TN 43 N 0976', currentLocation: 'Coonoor', tag1: 'EXPRESS', tag2: '11:33 AM', departure: '11:40 AM', arrival: '5:25 PM' },
];

// BusCard component
interface BusCardProps {
  data: typeof allBusData[0];
}

const BusCard = ({ data }: BusCardProps) => {
  const router = useRouter();
  const isRouteLong = data.route.includes(' - ') && data.route.length > 20;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/busdetails',
          params: { busData: JSON.stringify(data) },
        })
      }>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.routeContainer}>
            {isRouteLong ? (
              <View>
                <Text style={styles.routeTitle}>{data.route.split(' - ')[0]}</Text>
                <Text style={styles.routeTitle}>{data.route.split(' - ')[1]}</Text>
                <Text style={styles.viaText}>via {data.via}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.routeTitle}>{data.route}</Text>
                <Text style={styles.viaText}>via {data.via}</Text>
              </View>
            )}
          </View>
          <View style={styles.tagContainer}>
            <View style={[styles.tag, styles.tagExpress]}>
              <Text style={styles.tagText}>{data.tag1}</Text>
            </View>
            <View style={[styles.tag, styles.tagTime]}>
              <Text style={styles.tagText2}>{data.tag2}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.detailText}>Vehicle Number: {data.vehicleNumber}</Text>
          <Text style={styles.detailText}>Current Location: {data.currentLocation}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.footerLabel,{color:'green',fontWeight:'700'}]}>Departure:</Text>
            <Text style={styles.footerTime}>{data.departure}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.footerLabel,{color:'red',fontWeight:'700'}]}>Arrival:</Text>
            <Text style={styles.footerTime}>{data.arrival}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [executedSearch, setExecutedSearch] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isModeDropdownVisible, setModeDropdownVisible] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<'All' | string>('All');

  const busModes = ['All', 'EXPRESS', 'DELUXE', 'POINT TO POINT', 'AC', 'TOWN', 'ORDINARY'];

  const handleSearchSelect = (query: string) => {
    setExecutedSearch(query);
    setSearchQuery(query);
    setDropdownVisible(false);

    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(l => l !== query)];
      return updated.slice(0, 5);
    });
  };

  // New logic to filter based on vehicle number or via location
  const filteredBusData = allBusData.filter(bus => {
    const lowerCaseQuery = executedSearch.toLowerCase();
    const isVehicleMatch = bus.vehicleNumber.toLowerCase() === lowerCaseQuery;
    const isViaMatch = bus.via.toLowerCase().includes(lowerCaseQuery);
    return isVehicleMatch || isViaMatch;
  });

  const displayedBusData =
    selectedMode === 'All'
      ? filteredBusData
      : filteredBusData.filter(bus => bus.tag1 === selectedMode);

  // New logic for search suggestions
  const searchSuggestions =
    searchQuery.length > 0
      ? Array.from(new Set([
          ...allBusData.map(b => b.via),
          ...allBusData.map(b => b.vehicleNumber),
        ]))
        .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
      : [];
      
  const clearSearch = () => {
    setSearchQuery('');
    setExecutedSearch('');
    setDropdownVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>CityConnect</Text>
            <View style={styles.liveTag}>
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchFrame}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Places or Buses..."
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setDropdownVisible(true);
                setExecutedSearch('');
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

          {isDropdownVisible && (
            <View style={styles.dropdown}>
              {isSearchFocused && searchQuery.length === 0 ? (
                recentSearches.length > 0 ? (
                  <View>
                    <Text style={styles.dropdownTitle}>Recent Searches</Text>
                    {recentSearches.map((item, idx) => (
                      <TouchableOpacity key={idx} onPress={() => handleSearchSelect(item)}>
                        <Text style={styles.dropdownOption}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setRecentSearches([])}>
                      <Text style={[styles.dropdownOption, styles.clearText]}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.noResultsText}>No recent searches</Text>
                )
              ) : searchSuggestions.length > 0 ? (
                <View>
                  <Text style={styles.dropdownTitle}>Suggestions</Text>
                  {searchSuggestions.map((item, idx) => (
                    <TouchableOpacity key={idx} onPress={() => handleSearchSelect(item)}>
                      <Text style={styles.dropdownOption}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={styles.noResultsText}>No suggestions found</Text>
              )}
            </View>
          )}
        </View>

        {/* Filter & Mode Dropdown */}
        <View style={styles.sortCardsFrame}>
          <View style={styles.filterBar}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setModeDropdownVisible(!isModeDropdownVisible)}>
              <FontAwesome5 name="sort-amount-down" size={16} color="#444" />
              <Text style={styles.filterText}>{selectedMode === 'All' ? 'Sort by mode' : selectedMode}</Text>
            </TouchableOpacity>
            <View style={styles.locationTag}>
              <Ionicons name="location-sharp" size={16} color="#007bff" />
              <Text style={styles.locationText}>{executedSearch || 'Tiruppur'}</Text>
            </View>
          </View>

          {isModeDropdownVisible && (
            <View style={styles.modeDropdown}>
              {busModes.map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={styles.modeOption}
                  onPress={() => {
                    setSelectedMode(mode);
                    setModeDropdownVisible(false);
                  }}>
                  <Text style={[styles.modeText, selectedMode === mode && styles.selectedModeText]}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Bus Cards */}
          <ScrollView style={styles.cardList}>
            {executedSearch.length === 0 ? (
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>Enter a location or vehicle number to find buses</Text>
              </View>
            ) : displayedBusData.length > 0 ? (
              displayedBusData.map(bus => <BusCard key={bus.id} data={bus} />)
            ) : (
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>No buses found for this location or vehicle number</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    backgroundColor: '#007bff',
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
    color: '#fff',
  },
  liveTag: {
    marginTop:2.5,
    marginLeft: 8,
    backgroundColor: '#7abaffff',
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchFrame: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortCardsFrame: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  dropdownTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
  },
  clearText: {
    color: '#dc3545',
    textAlign: 'right',
    fontSize: 14,
  },
  noResultsText: {
    padding: 10,
    textAlign: 'center',
    color: '#888',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  filterText: {
    marginLeft: 8,
    color: '#444',
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e6f2ff',
    borderWidth: 1,
    borderColor: '#b3d9ff',
  },
  locationText: {
    marginLeft: 5,
    color: '#007bff',
  },
  modeDropdown: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
    padding: 5,
  },
  modeOption: {
    padding: 10,
  },
  modeText: {
    fontSize: 16,
    color: '#333',
  },
  selectedModeText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  cardList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f4f7',
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f4f7',
    borderLeftColor:'#007bff',
    borderLeftWidth:4.5,
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
    color: '#888',
    marginTop: 5,
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
    fontSize: 10,
    fontWeight:'500',
    color: '#ff9800',
  },
  tagExpress: {
    backgroundColor: '#feddacff',
    height:20,
  },
  tagTime: {
    backgroundColor: '#007bff',
    height:20,
  },
  tagText2:{
    color:'#fff',
    fontSize:10,
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
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 5,
    paddingBottom: 1,
  },
  footerLabel: {
    fontSize: 14,
    color: '#888',
  },
  footerTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    marginTop: 2,
  },
});
