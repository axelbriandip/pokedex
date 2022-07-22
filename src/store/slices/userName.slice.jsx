import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userNameSlice = createSlice({
    name: 'userName',
    initialState: '',
    reducers: {
        setUserName: (state, action) => {
            return action.payload // setear por parámetro
        }
    }
})

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;