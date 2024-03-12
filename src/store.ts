import {configureStore} from '@reduxjs/toolkit'
import { apiSlice}  from './features/api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]:apiSlice.reducer,

 
    },

    //enables caching, invalidations, polling etc
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  })


setupListeners(store.dispatch)


//creates redux store
//Automatic configures redux DevTools