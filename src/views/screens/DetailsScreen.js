import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SecondaryButton} from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, } from '../cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({navigation, route}) => {
  const item = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        dispatch(setCartItems(JSON.parse(storedCart)));
      }
    };

    loadCart();
  }, []);
  const handleAddItem = (item) => {
    console.log(item)
    dispatch(addItem(item));
  };


  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={item.image} style={{height: 220, width: 220}} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <SecondaryButton title="Add To Cart"  onPress={() => handleAddItem(item)}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default DetailsScreen;
