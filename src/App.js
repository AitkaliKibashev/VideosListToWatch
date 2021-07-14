import {useState} from "react"
import './App.css'


function App() {
    const [videosList, setVideos] = useState([])
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const setVideosId = (videoId) => setVideos(prevValue => [...prevValue, {videoId, rating:0}])

        if (inputValue) {
            let videoId = inputValue.split('v=')[1]
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
    }



    const removeVideo = (id) => {
        setVideos(prevValue => {
           return prevValue.filter(v => v.videoId !== id)
        })
    }

    const changeRating = (id, change) => {
        setVideos(prevValue => {
            return prevValue.map(v => v.videoId === id ? {...v, rating: v.rating + change}: v)
        })
    }

    const incrementRating = (id) => {
        changeRating(id, +1)
    }

    const decrementRating = (id) => {
        changeRating(id, -1)
    }

    const biggestToSmallest = (a, b) => {
        return b.rating - a.rating;
    }

    videosList.sort(biggestToSmallest)

    return (
        <div className="App">
            <div className="container">
                <h1>List of videos to watch</h1>
                <form onSubmit={handleSubmit} className="row mb-2">
                    <div className="col mb-5 mt-5">
                        <input
                            value={inputValue}
                            onChange={event => setInputValue(event.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="https://www.youtube.com/watch?v=ctBt7T8C8QI" />
                    </div>
                    <button className="btn btn-success mb-5 mt-5 col-3">Add video to the list</button>

                </form>
                <div className="video-grid">
                    {videosList.map(v =>
                        <div key={v} className="video-col mb-2">
                            <iframe width="auto" height="238" src={`https://www.youtube.com/embed/${v.videoId}`}
                                  title="YouTube video player" frameBorder="0"
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                   allowFullScreen
                            />
                            <div className="footer">
                                <button onClick={() => removeVideo(v.videoId)} className="btn btn-danger mt-2" >Remove</button>
                                <div className="rating">
                                    <button onClick={() => incrementRating(v.videoId)} className="btn btn-primary mb-2" >+1</button>
                                    <p>Rating: {v.rating}</p>
                                    <button onClick={() => decrementRating(v.videoId)} className="btn btn-primary mb-2" >-1</button>
                                </div>
                            </div>
                        </div>
                        )}
                </div>
            </div>
            <ul>

            </ul>
        </div>
    )
}

export default App
