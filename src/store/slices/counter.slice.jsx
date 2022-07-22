import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const counterSlice = createSlice({
    name: 'counter',
    initialState: 100,
    reducers: {
        // acciones del slice
        increment: (state, action) => {
            // incrementa el estado actual
            return state + 1;
        },
        setCounter: (state, action) => {
            // actualiza el estado por parámetro
            return action.payload
        }
    }
})

// se exportan las acciones
export const { increment, setCounter } = counterSlice.actions;

export default counterSlice.reducer;