import { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'


const TripCard = ({tripId, leaveTrip, joinTrip, cancelTrip}) => {
    const [trip, setTrip] = useState(null)
    const history = useHistory()

    const fetchTripCallback = useCallback(() => {
        fetch(`/trips/${tripId}`)
            .then(res => res.json())
            .then(trip => setTrip(trip))
    }, [tripId])

    useEffect(() => {
        fetchTripCallback()
    }, [fetchTripCallback])

    const leaveOrJoinButton = (trip) => {
        if (trip.user_trip) {
            return (
                <button onClick={() => leaveTrip(trip.id).then(() => fetchTripCallback())}>Leave Trip</button>
            )
        } else {
            return (
                <button onClick={() => joinTrip(trip.id).then(() => fetchTripCallback())}>Join Trip</button>
            )
        }
    }

    const cancelTripBtn = (trip) => {
        if (trip.user_can_modify) {
            return (
                <button onClick={handleCancel}>Cancel Trip</button>
            )
        }
    }

    const handleCancel = (e) => {
        cancelTrip(trip.id)
        history.push('/trips')
    }

    if(!trip){return <div></div>}

    return (
        <div>
            <h1>{trip.name}</h1>
            {cancelTripBtn(trip)}
            {leaveOrJoinButton(trip)}
            <h2>Members</h2>
                <div>
                    {trip.members?.map(member => <div>{member.username}</div>)}
                </div>
            <h2>Events</h2>
                <ul>
                    {trip.events?.map(event => (
                        <li>
                            <Link to={`/events/${event.id}`}>
                            <div>
                                {event.title}
                            </div>
                            <div>
                            {event.description}
                            </div>
                            <div>
                            {event.location}
                            </div>
                            <div>
                            {event.budget}
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>
    )

    // return (
    //     <div className="TripCardContainer">
    //         <div className="TripCardImg">
    //             <img src={img_url} alt={img_url}/>
    //         </div>
    //         <div className="TripDetails">
    //             <h2 className="TripName">{name}</h2>
    //             <h3 className="TripLocation">{location}</h3>
    //             <h4 className="TripDuration">Duration: {start_date} to {end_date}</h4>
    //             <ImCross className="RemoveIcon" />
    //         </div>
    //     </div>
    // )
}

export default TripCard
