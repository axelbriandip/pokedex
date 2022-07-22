import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter.slice'

// esta es la store
export default configureStore({
    reducer: {
        // estados gloables
        counter: counterSlice
	}
})