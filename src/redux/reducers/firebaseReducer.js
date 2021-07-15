const ADD_VIDEO_TO_LIST = 'ADD_VIDEOS_TO_LIST'
const REMOVE_VIDEO_FROM_LIST = 'REMOVE_VIDEO_FROM_LIST'
const CHANGE_VIDEO_RATING = 'CHANGE_VIDEO_RATING'

const initialState = {
    videosList: [

    ]
}

export const firebaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIDEO_TO_LIST:
            return {
                ...state,
                videosList: [...state.videosList, action.payload]
            }

        case REMOVE_VIDEO_FROM_LIST:
            return {
                ...state,
                videosList: [state.videosList.filter(v => v.videoId !== action.id)]
            }

        case CHANGE_VIDEO_RATING:
            return {
                ...state,
                videosList: state.videosList.map(v => v.videoId === action.id ? {...v, rating: v.rating + action.change}: v)
            }

        default:
            return state
    }
}
