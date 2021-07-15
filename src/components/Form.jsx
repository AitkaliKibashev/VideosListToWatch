
const Form = ({handleSubmit, inputValue, setInputValue}) => {
    return (
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
    )
}

export default Form
