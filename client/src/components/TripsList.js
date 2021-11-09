import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ImCross} from 'react-icons/im'

const TripsList = ({ trips, leaveTrip, joinTrip, createTrip, cancelTrip }) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [img_url, setImgURL] = useState('')

    const leaveOrJoinButton = (trip) => {
        if (trip.user_trip) {
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
                    <div key={trip.id}>
                        <Link to={`trips/${trip.id}`}>
                        <div className="TripCardContainer">
                            <div className="TripCardImg">
                                <img src={trip.img_url} alt={trip.img_url}/>
                            </div>
                            <div className="TripDetails">
                                <h2 className="TripName">{trip.name}</h2>
                                <h3 className="TripLocation">{trip.location}</h3>
                                <h4 className="TripDuration">Duration: {trip.start_date} to {trip.end_date}</h4>
                                <ImCross className="RemoveIcon"/>
                            </div>
                        </div>
                        <div>{leaveOrJoinButton(trip)}</div>
                        </Link> 
                    </div>
                ))}
            </div>
            <h3>Add Trip</h3>
            <form className="NewTripForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor="start_date">Start Date:</label>
                <input
                    type="date"
                    name="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="end_date">End Date:</label>
                <input
                    type="date"
                    name="end_date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <label htmlFor="img_url">Image URL:</label>
                <input
                    type="text"
                    name="img_url"
                    value={img_url}
                    onChange={(e) => setImgURL(e.target.value)}
                />
                <button className="NewTripBtn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default TripsList
