import {useState} from 'react'
// import { useHistory } from 'react-router'

const NewTripForm = ({errors, setErrors}) => {
    const [newTrip, setNewTrip] = useState([])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [img_url, setImgURL] = useState('')

    // const history = useHistory()

    const handleNewTripSubmit = (e) => {
        setErrors([])
        fetch('/trips', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                location,
                start_date,
                end_date,
                img_url
            })
        }).then((r) => {
            if (r.ok) {
                r.json().then((newTrip) => setNewTrip(newTrip))
                // history.push('/trips')
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    return (
        <div className="NewTripContainer">
            <form className="NewTripForm" onSubmit={handleNewTripSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Start Date:</label>
                <input
                    type="text"
                    id="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date:</label>
                <input
                    type="text"
                    id="end_date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    id="img_url"
                    value={img_url}
                    onChange={(e) => setImgURL(e.target.value)}
                />
                <button className="NewTripBtn" type="submit">Submit</button>
                {errors.map((err) => (
                    <div className="NewTripError" key={err}>{err}</div>
                )) }
            </form>
        </div>
    )
}

export default NewTripForm
