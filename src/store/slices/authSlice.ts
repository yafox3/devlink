import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../http/index'
import { Statuses } from '../../models/statuses'
import { IUser, IUserData } from '../../models/user'
import { setTokenToLocalStorage } from '../../helpers/localStorage.helper'

export const authLogin = createAsyncThunk('auth/login', async (user: IUserData) => {
  const { data } = await axios.post<IUser>('auth/authenticate', user)
  setTokenToLocalStorage(data.token)
	return data
})

export const authSignUp = createAsyncThunk('auth/signUp', async (user: IUserData) => {
  const { data } = await axios.post<IUser>('auth/register', user)
  setTokenToLocalStorage(data.token)
	return data
})

interface AuthState {
  email: string | null
	token: string | null
  error: string | null
	status: Statuses
}

const initialState: AuthState = {
  email: null,
	token: null,
  error: null,
	status: Statuses.INIT
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) =>{
    builder.addCase(authLogin.pending, (state: AuthState) => {
      state.status = Statuses.LOADING
      state.email = null
      state.token = null
      state.error = null
    }),
    builder.addCase(authLogin.fulfilled, (state: AuthState, action) => {
      state.status = Statuses.LOADED
      state.email = action.payload.email
      state.token = action.payload.token
      state.error = null
    }),
    builder.addCase(authLogin.rejected, (state: AuthState, action) => {
      state.status = Statuses.ERROR
      state.email = null
      state.token = null
      state.error = action.error.message || null
    }),
    builder.addCase(authSignUp.pending, (state: AuthState) => {
      state.status = Statuses.LOADING
      state.email = null
      state.token = null
      state.error = null
    }),
    builder.addCase(authSignUp.fulfilled, (state: AuthState, action) => {
      state.status = Statuses.LOADED
      state.email = action.payload.email
      state.token = action.payload.token
      state.error = null
    }),
    builder.addCase(authSignUp.rejected, (state: AuthState, action) => {
      state.status = Statuses.ERROR
      state.email = null
      state.token = null
      state.error = action.error.message || null
    })
  },
})

export const { actions: authActions, reducer: authReducer } = authSlice