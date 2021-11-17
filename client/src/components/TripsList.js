import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {ImCross} from 'react-icons/im'

const TripsList = ({ trips, leaveTrip, joinTrip, createTrip, cancelTrip }) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [img_url, setImgURL] = useState('')

    const [toggleNewTrip, setToggleNewTrip] = useState(false)

    const history = useHistory()

    // const leaveOrJoinButton = (trip) => {
    //     if (trip.user_trip) {
    //         return <button onClick={() => leaveTrip(trip.id)}>Leave Trip</button>
    //     } else {
    //         return <button onClick={() => joinTrip(trip.id)}>Join Trip</button>
    //     }
    // }

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

    const handleOnClickTripForm = () => {
        setToggleNewTrip(true)
    }

    return (
        <>
            <div className="NewTripContainer">
                <div className="TripsListText">
                    <h2>Trips</h2>
                </div>
                <div className="AddTripFormText">
                    <h3 onClick={handleOnClickTripForm}>+ New Trip</h3>
                </div>
                {toggleNewTrip ?
                    <div className="NewTripForm">
                        <div className="NewTripText">
                            <h1>Add a New Trip</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="location">Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </label>
                            <label htmlFor="start_date">Start Date:
                                <input
                                    type="date"
                                    name="start_date"
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </label>
                            <label htmlFor="end_date">End Date:
                                <input
                                    type="date"
                                    name="end_date"
                                    value={end_date}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </label>
                            <label htmlFor="img_url">Image URL:
                                <input
                                    type="text"
                                    name="img_url"
                                    value={img_url}
                                    onChange={(e) => setImgURL(e.target.value)}
                                />
                            </label>
                            <button className="NewTripBtn" type="submit">Submit</button>
                        </form>
                        <ImCross className="CloseTripFormBtn" onClick={() => setToggleNewTrip(false)} />
                    </div> 
                : null}
            </div>
            <div className="TripCardContainer">
                {trips.map(trip => (
                    <div key={trip.id} className="EachTripCardContainer">
                        <Link to={`trips/${trip.id}`}>
                            <div>
                                <div className="TripCardImg">
                                    <img src={trip.img_url} alt={trip.img_url}/>
                                </div>
                                <div className="TripDetails">
                                    <h2 className="TripName">{trip.name}</h2>
                                    <h3 className="TripLocation">{trip.location}</h3>
                                    <h4 className="TripDuration">Duration: {trip.start_date} to {trip.end_date}</h4>
                                    <h6 className="TripUniqueID">Unique ID: {trip.id}</h6>
                                </div>
                            </div>
                        {/* <div>{leaveOrJoinButton(trip)}</div> */}
                        </Link> 
                    </div>
                ))}
            </div>
        </>
    )
}

export default TripsList
