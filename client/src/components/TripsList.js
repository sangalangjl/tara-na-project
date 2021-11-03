import { useState } from 'react'
import { Link } from 'react-router-dom'

const TripsList = ({ trips, leaveTrip, joinTrip, createTrip }) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [img_url, setImgURL] = useState('')

    const leaveOrJoinButton = (trip) => {
        if (trip.user_group) {
            return <button onClick={() => leaveTrip(trip.id)}>Leave Trip</button>
        } else {
            return <button onClick={() => joinTrip(trip.id)}>Join Trip</button>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createTrip({
            name, 
            location,
            start_date,
            end_date,
            img_url
        })
        setName('')
        setLocation('')
        setStartDate('')
        setEndDate('')
        setImgURL('')
    }

    return (
        <div>
            <h1>Trips</h1>
            <div>
                {trips.map(trip => (
                    <p>
                        <Link to={`trips/${trip.id}`}>{trip.name}</Link> <span>{leaveOrJoinButton(trip)}</span>
                    </p>
                ))}
            </div>
            <h3>Add Trip</h3>
            <form className="NewTripForm" onSubmit={handleSubmit}>
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
            </form>
        </div>
    )
}

export default TripsList
