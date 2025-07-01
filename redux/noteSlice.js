import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:null,
  notes:[],
  darkMode: false,
};
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setUser : (state,action) => {
      state.user = action.payload
    },
    setNotes: (state,action) => {
      state.notes = [...state.notes, action.payload]
    },
    setLogoutUser : (state) => {
      state.user = null
    },
    setDarkMode : (state,action) => {
      state.darkMode = action.payload
    },
  },
})

export const { setUser,setNotes,setLogoutUser,setDarkMode } = noteSlice.actions

export default noteSlice.reducer