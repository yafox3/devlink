import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { base64ToImg, getTokenFromLocalStorage } from '../../helpers'
import { axios } from '../../http'
import { IDevCard, IUser, Statuses } from '../../models'

export const getUser = createAsyncThunk('user/me', async () => {
	const { data } = await axios.get<IUser>('auth/me')
	return data
})

export const getUserCards = createAsyncThunk('user/card', async () => {
	const { data } = await axios.get<IDevCard[]>('/card')
	return data
})

export const updateProfile = createAsyncThunk('user/update', async (updatedProfile: FormData) => {
	const { data } = await axios.post('user/update', updatedProfile, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${getTokenFromLocalStorage()}`
		}
	})
	return data
})

interface UserState {
	user: IUser
	error: string | null
	status: Statuses
}

const initialState: UserState = {
	user: {
		email: '',
		firstName: '',
		lastName: '',
		img: '',
		token: '',
		devCards: []
	},
	error: null,
	status: Statuses.INIT
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(updateProfile.pending, (state: UserState) => {
			state.status = Statuses.LOADING
			state.user.firstName = ''
			state.user.lastName = ''
			state.user.img = ''
			state.error = null
		}),
			builder.addCase(updateProfile.fulfilled, (state: UserState, action) => {
				state.status = Statuses.LOADED
				state.error = null
				state.user.firstName = action.payload.firstName
				state.user.lastName = action.payload.lastName
				state.user.img = base64ToImg(action.payload.img)
			})
		builder.addCase(updateProfile.rejected, (state: UserState, action) => {
			state.status = Statuses.ERROR
			state.error = action.error.message || null
			state.user.firstName = ''
			state.user.lastName = ''
			state.user.img = ''
		}),
		builder.addCase(getUser.pending, (state: UserState) => {
			state.status = Statuses.LOADING
			state.user.email = ''
			state.user.token = ''
			state.user.firstName = ''
			state.user.lastName = ''
			state.user.img = ''
			state.user.devCards = []
			state.error = null
		}),
		builder.addCase(getUser.fulfilled, (state: UserState, action) => {
			state.status = Statuses.LOADED
			state.user.email = action.payload.email
			state.user.token = action.payload.token
			state.user.firstName = action.payload.firstName
			state.user.lastName = action.payload.lastName
			state.user.img = base64ToImg(action.payload.img)
			state.user.devCards = action.payload.devCards
			state.error = null
		}),
		builder.addCase(getUser.rejected, (state: UserState, action) => {
			state.status = Statuses.ERROR
			state.user.email = ''
			state.user.token = ''
			state.user.firstName = ''
			state.user.lastName = ''
			state.user.img = ''
			state.user.devCards = []
			state.error = action.error.message || null
		})
		builder.addCase(getUserCards.pending, (state: UserState) => {
			state.status = Statuses.LOADING
			state.user.devCards = []
			state.error = null
		}),
		builder.addCase(getUserCards.fulfilled, (state: UserState, action) => {
			state.status = Statuses.LOADED
			state.user.devCards = action.payload
			state.error = null
		}),
		builder.addCase(getUserCards.rejected, (state: UserState, action) => {
			state.status = Statuses.ERROR
			state.user.devCards = []
			state.error = action.error.message || null
		})
	}
})

export const { actions: userActions, reducer: userReducer } = userSlice
