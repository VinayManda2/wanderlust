import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    title: '',
    image: { // Combine imageUrl and imageName into a single object
      url: '',
      filename: '',
    },
    ownerUsername: '',
    ownerId: '',
    description: '',
    price: 0,
    location: '',
    country: '',
  },
  reducers: {
    setItem: (state, action) => {
      const { title, image, ownerUsername, ownerId, description, price, location, country } = action.payload;
      state.title = title;
      state.image = image;  // Set the image object in the state
      state.ownerUsername = ownerUsername;
      state.ownerId = ownerId;  
      state.description = description;
      state.price = price;
      state.location = location;
      state.country = country;
    },
  },
});

export const { setItem } = itemSlice.actions;
export default itemSlice.reducer;
