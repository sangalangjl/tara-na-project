import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {ImCross} from 'react-icons/im'

const TripCard = ({tripId, leaveTrip, joinTrip}) => {
    const [trip, setTrip] = useState(null)

    const fetchTripCallback = useCallback(() => {
        fetch(`trips/${tripId}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(trip => setTrip(trip))
    }, [tripId])

    useEffect(() => {
        fetchTripCallback()
    }, [fetchTripCallback])

    const leaveOrJoinButton = (trip) => {
        if (trip.user_group) {
            return (
                <button onClick={() => leaveTrip(trip.id).then(() => fetchTripCallback())}>Leave Trip</button>
            )
        } else {
            return (
                <button onClick={() => joinTrip(trip.id).then(() => fetchTripCallback())}>Join Trip</button>
            )
        }
    }

    if (!trip){return <div></div>}

    return (
        <div>
            <h1>{trip.name}</h1>
            {leaveOrJoinButton(trip)}
            <h2>Members</h2>
                <ul>
                    {trip.members?.map(member => <li>{member.username}</li>)}
                </ul>
            <h2>Events</h2>
                <ul>
                    {trip.events?.map(event => (
                        <li>
                            <Link to={`events/${event.id}`}>
                            {event.title}
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
