import {useEffect, useState} from "react"
import './App.css'
import {connect} from "react-redux";
import {
    addVideoToList,
    decrementVideoRating,
    incrementVideoRating, initUser,
    removeVideoFromList,
    setVideosToList
} from "./redux/reducers/appReducer";
import Loader from "./components/Loader";
import Form from "./components/Form";
import Videos from "./components/Videos";



function App({videosList, addVideoToList, removeVideoFromList, incrementVideoRating, decrementVideoRating, isLoading, setVideosToList, initUser}) {
    initUser()
    const [inputValue, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setVideosToList()
    }, [setVideosToList])

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrorMessage('')
        const setVideosId = (videoId) => addVideoToList({videoId, rating: 0})

        if (inputValue && inputValue.indexOf('https') === 0) {
            let videoId = inputValue.split('v=')[1]
            if (!videoId) {
                videoId = inputValue.split('be/')[1]
            }
            let ampersandPosition = videoId.indexOf('&')

            if(ampersandPosition !== -1) {
                videoId = videoId.substring(0, ampersandPosition)
                setVideosId(videoId)
                setInputValue('')
                return
            }

            setVideosId(videoId)
            setInputValue('')
        }

        setInputValue('')
        return setErrorMessage('This is not link to the Youtube video')
    }

    const removeVideo = (id) => {
        removeVideoFromList(id)
    }

    const incrementRating = (id, rating) => {
        incrementVideoRating(id, rating)
    }

    const decrementRating = (id, rating) => {
        decrementVideoRating(id, rating)
    }

    const biggestToSmallest = (a, b) => {
        return b.rating - a.rating;
    }

    videosList.sort(biggestToSmallest)

    return (
        <div className="App">
            <div className="container">
                <h1 className="mt-3">List of videos to watch</h1>
                <Form handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue}/>
                {errorMessage ?
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div> :
                    null
                }
                {isLoading ?
                    <Loader />:
                    <Videos removeVideo={removeVideo} incrementRating={incrementRating} decrementRating={decrementRating} videosList={videosList} />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    videosList: state.mainApp.videosList,
    isLoading: state.mainApp.isLoading
})

export default connect(mapStateToProps, {
    addVideoToList,
    removeVideoFromList,
    incrementVideoRating,
    decrementVideoRating,
    setVideosToList,
    initUser
})(App)
