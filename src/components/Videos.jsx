

const Videos = ({videosList, removeVideo, incrementRating, decrementRating}) => {
    return (
        <div>
            <div className="video-grid">
                {videosList.map(v => v.videoId &&
                    <div key={v} className="video-col mb-2">
                        <iframe width="auto" height="238" src={`https://www.youtube.com/embed/${v.videoId}`}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                        />
                        <div className="footer">
                            <button onClick={() => removeVideo(v.id)} className="btn btn-danger mt-2" >Remove</button>
                            <div className="rating">
                                <button onClick={() => incrementRating(v.id, v.rating)} className="btn btn-primary mb-2" >+1</button>
                                <p>Rating: {v.rating}</p>
                                <button onClick={() => decrementRating(v.id, v.rating)} className="btn btn-primary mb-2" >-1</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {!videosList.length && <h2 className="text-center mt-5">Add some videos from Youtube</h2>}
        </div>
    )
}

export default Videos
