import { createSlice } from '@reduxjs/toolkit';
import { dataOrchid } from '../../Share/ListOfOrchids';

const initialState = dataOrchid;

const orchidSlice = createSlice({
  name: 'orchids',
  initialState,
  reducers: {
    addOrchid: (state, action) => {
      // Generate a new unique id based on the current max id in state
      const newId =
        state.length > 0
          ? Math.max(...state.map((orchid) => Number(orchid.id))) + 1
          : 1;
      // Add the new orchid with generated id (as a string)
      state.push({ ...action.payload, id: String(newId) });
    },
    deleteOrchid: (state, action) => {
      // Remove the orchid with the matching id
      return state.filter((orchid) => orchid.id !== action.payload);
    },
    editOrchid: (state, action) => {
      // action.payload should contain: { id, updatedData }
      const { id, updatedData } = action.payload;
      const index = state.findIndex((orchid) => orchid.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
      }
    },
  },
});

export const { addOrchid, deleteOrchid, editOrchid } = orchidSlice.actions;
export default orchidSlice.reducer;
