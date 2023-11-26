import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setTokenToLocalStorage } from '../../helpers'
import { axios } from '../../http'
import { IUser, IUserData, Statuses } from '../../models'

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

export const authCheck = createAsyncThunk('auth/check', async () => {
	const { data } = await axios.get<IUser>('auth/me')
	setTokenToLocalStorage(data.token)
	return data
})

interface AuthState {
	token: string
	error: string | null
	isDataReceived: boolean
	status: Statuses
}

const initialState: AuthState = {
	token: '',
	error: null,
	isDataReceived: false,
	status: Statuses.INIT
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(authLogin.pending, (state: AuthState) => {
			state.status = Statuses.LOADING
			state.token = ''
			state.error = null
		}),
			builder.addCase(authLogin.fulfilled, (state: AuthState, action) => {
				state.status = Statuses.LOADED
				state.token = action.payload.token
				state.error = null
			}),
			builder.addCase(authLogin.rejected, (state: AuthState, action) => {
				state.status = Statuses.ERROR
				state.token = ''
				state.error = action.error.message || null
			}),
			builder.addCase(authSignUp.pending, (state: AuthState) => {
				state.status = Statuses.LOADING
				state.token = ''
				state.error = null
			}),
			builder.addCase(authSignUp.fulfilled, (state: AuthState, action) => {
				state.status = Statuses.LOADED
				state.token = action.payload.token
				state.error = null
			}),
			builder.addCase(authSignUp.rejected, (state: AuthState, action) => {
				state.status = Statuses.ERROR
				state.token = ''
				state.error = action.error.message || null
			}),
			builder.addCase(authCheck.pending, (state: AuthState) => {
				state.status = Statuses.LOADING
				state.token = ''
				state.error = null
				state.isDataReceived = false
			}),
			builder.addCase(authCheck.fulfilled, (state: AuthState, action) => {
				state.status = Statuses.LOADED
				state.token = action.payload.token
				state.error = null
				state.isDataReceived = true
			}),
			builder.addCase(authCheck.rejected, (state: AuthState) => {
				state.status = Statuses.ERROR
				state.token = ''
				state.error = null
				state.isDataReceived = true
			})
	}
})

export const { actions: authActions, reducer: authReducer } = authSlice
