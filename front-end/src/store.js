import {
    createSlice,
    configureStore,
    getDefaultMiddleware,
  } from '@reduxjs/toolkit'
//   import LoggerMiddleware from 'redux-logger'
  
  import reducer from './redux'
  
  const middleware = [ ...getDefaultMiddleware({ thunk: false }) ]
  
  
  const store = configureStore({
    reducer,
    middleware,
  })
  
  export default store
  