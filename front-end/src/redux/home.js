import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    skilledUser: null,
    token: null,
}

const {
  actions: { saveSkilledData, saveToken },
  reducer,
} = createSlice({
  name: 'home',
  initialState,
  reducers: {
    saveSkilledData : (state, action) => ({
        ...state,
        skilledUser: action.payload
    }),
    saveToken : (state, action) => ({
      ...state,
      token: action.payload
  })
  },
})

export default reducer
export { saveSkilledData, saveToken }