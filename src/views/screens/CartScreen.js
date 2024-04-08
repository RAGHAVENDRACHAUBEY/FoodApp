import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, removeItem} from '../cartSlice';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  console.log('Cartitemssss', cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item?.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>₹{item.price}</Text>
        </View>
        <View>
         <TouchableOpacity onPress={()=> dispatch(removeItem(item.id))}>
         <MaterialIcons name='delete-forever' size={25} style={{alignSelf:"flex-end"}}/>
         </TouchableOpacity>
        
       
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={() => dispatch(decrement(item.id))}>
              <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 18,color:"white"}}>
            {item.quantity}
          </Text>
            <TouchableOpacity onPress={() => dispatch(increment(item.id))}>
              <Icon name="add" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={cartItems}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ₹{totalPrice?.toFixed(3)}
              </Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
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
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginTop: 10,
    paddingHorizontal:5,
    width: 100,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignContent: 'center',
  },
});

export default CartScreen;
