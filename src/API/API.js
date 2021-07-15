import axios from "axios";

const url = process.env.REACT_APP_DB_URL

export const videosListAPI = {
    changeVideoRating: (id, rating, userId) => {
        return axios.patch(`${url}/users/${userId}/videos/${id}.json`, {rating: rating})
    },
    addVideoToList: (video, userId) => {
        return axios.post(`${url}/users/${userId}/videos.json`, video)
    },
    fetchVideosList: (userId) => {
        return axios.get(`${url}/users/${userId}/videos.json`)
    },
    removeVideoFromList: (id, userId) => {
        return axios.delete(`${url}/users/${userId}/videos/${id}.json`)
    }
}

export const userAPI = {
    setUser: () => {
        return axios.post(`${url}/users.json`, { }).then(res => localStorage.setItem('userId', res.data.name))
    },
    getUser: (id) => {
        return axios.get(`${url}/users/${id}.json`)
    }
}
