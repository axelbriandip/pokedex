import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter.slice'
import userNameSlice from './slices/userName.slice'

// esta es la store
export default configureStore({
    reducer: {
        // estados gloables
        counter: counterSlice,
        userName: userNameSlice
	}
})