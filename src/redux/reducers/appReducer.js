import {userAPI, videosListAPI} from "../../API/API";

const ADD_VIDEO_TO_LIST = 'ADD_VIDEOS_TO_LIST'
const REMOVE_VIDEO_FROM_LIST = 'REMOVE_VIDEO_FROM_LIST'
const CHANGE_VIDEO_RATING = 'CHANGE_VIDEO_RATING'
const CHANGE_LOADING = 'CHANGE_LOADING'
const SET_VIDEOS = 'SET_VIDEOS'

const initialState = {
    videosList: [

    ],
    isLoading: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIDEO_TO_LIST:
            return {
                ...state,
                videosList: [...state.videosList, action.payload]
            }

        case REMOVE_VIDEO_FROM_LIST:
            return {
                ...state,
                videosList: state.videosList.filter(v => v.id !== action.id)
            }

        case CHANGE_VIDEO_RATING:
            return {
                ...state,
                videosList: state.videosList.map(v => v.id === action.id ? {...v, rating: v.rating + action.change}: v)
            }

        case CHANGE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case SET_VIDEOS:
            return {
                ...state,
                videosList: [...state.videosList, ...action.videosList]
            }

        default:
            return state
    }
}

const addVideoToListAC = (payload) => ({type: ADD_VIDEO_TO_LIST, payload})
const removeVideoFromListAC = (id) => ({type: REMOVE_VIDEO_FROM_LIST, id})
const changeVideoRatingAC = (id, change) => ({type: CHANGE_VIDEO_RATING, id, change})
const toggleLoading = (isLoading) => ({type: CHANGE_LOADING, isLoading})
const setVideos = (videosList) => ({type: SET_VIDEOS, videosList})

const userId = localStorage.getItem('userId')

export const addVideoToList = (video) => async (dispatch) => {
    dispatch(toggleLoading(true))
    const res = await videosListAPI.addVideoToList(video, userId)

    const payload = {
        ...video,
        id: res.data.name
    }
    dispatch(addVideoToListAC(payload))
    dispatch(toggleLoading(false))
}

export const removeVideoFromList = (id) => async (dispatch) => {
    dispatch(toggleLoading(true))
    await videosListAPI.removeVideoFromList(id, userId)
    dispatch(removeVideoFromListAC(id))
    dispatch(toggleLoading(false))
}

export const incrementVideoRating = (id, rating) => async (dispatch) => {
    dispatch(toggleLoading(true))
    await videosListAPI.changeVideoRating(id, rating + 1, userId)
    dispatch(changeVideoRatingAC(id, +1))
    dispatch(toggleLoading(false))
}

export const decrementVideoRating = (id, rating) => async (dispatch) => {
    dispatch(toggleLoading(true))
    await videosListAPI.changeVideoRating(id, rating - 1, userId)
    dispatch(changeVideoRatingAC(id, -1))
    dispatch(toggleLoading(false))
}

export const setVideosToList = () => async (dispatch) => {
    dispatch(toggleLoading(true))
    const res = await videosListAPI.fetchVideosList(userId)
    let payload = []
    if(res.data) {
        payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })
    }
    dispatch(setVideos(payload))
    dispatch(toggleLoading(false))
}

export const initUser = () => async (
) => {
    if(!userId) {
        await userAPI.setUser()
    }
}
