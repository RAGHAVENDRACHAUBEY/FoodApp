import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
};
export const addItemAsync = createAsyncThunk(
    'cart/addItemAsync',
    async (product, thunkAPI) => {
      const { dispatch, getState } = thunkAPI;
      dispatch(addItem(product)); 
      const { cart } = getState();
      await AsyncStorage.setItem('cart', JSON.stringify(cart.items));
    }
  );

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        state.items.push(tempProductItem);
      }
    },
  
    removeItem: (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter(item => item.id !== itemId);
      },
    increment: (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload);
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        }
      },
    decrement: (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload);
        if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1); 
        }
      },
  },
});

export const { addItem, removeItem, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
