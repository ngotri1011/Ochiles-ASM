import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice';
import orchidReducer from '../redux/orchidSlice';

export const store = configureStore({
    reducer: { users: userReducer,},

});