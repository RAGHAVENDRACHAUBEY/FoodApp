import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import COLORS from '../../consts/colors';


const SearchBarComponent = ({ onSearchQueryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (onSearchQueryChange) {
      onSearchQueryChange(query);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={() => <Icon name="magnify" size={20} color="gray" />} 
        clearIcon={() => <Icon name="close" size={20} color="gray" />}
        style={styles.searchbar}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchbar: {
    borderRadius: 30,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default SearchBarComponent;
