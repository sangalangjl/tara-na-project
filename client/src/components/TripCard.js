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
        <>
            <div className="TripCardPage">
                <div>
                    <img src={trip.img_url} alt={trip.img_url}/>
                </div>
                <div className="TripCardName">
                    <h1>{trip.name}</h1>
                </div>
                <div className="TripCardLocation">
                    <h3>{trip.location}</h3>
                </div>
                <div className="TripCardDuration">
                    <h4>Duration: {trip.start_date} to {trip.end_date}</h4>
                </div>
                <div className="TripCardUniqueID">
                    <h5>Unique ID: {trip.id}</h5>
                </div>
                {cancelTripBtn(trip)}
                <div className="LeaveOrJoinTripBtn">
                    {leaveOrJoinButton(trip)}
                </div>
                <div className="MembersContainer">
                    <div className="MembersText">
                        <h2>Members ({trip.members?.length})</h2>
                    </div>
                    <div className="MembersList">
                            {trip.members?.map(member => 
                                <div key={member.id} className="MemberListDetails">
                                    <div className="MemberImg">
                                        <img src={member.img_url} alt={member.img_url}/>
                                    </div>
                                    <div>
                                        {member.first_name} {member.last_name}
                                    </div>
                                </div>)}
                    </div>
                </div>
                <div className="TripEventsContainer">
                    <div className="TripEventText">
                        <h2>Events ({trip.events?.length})</h2>
                    </div>
                    {trip.events?.map(event => (
                        <div key={trip.id} className="TripEventDetails">
                            <Link to={`/events/${event.id}`}>
                                <div>
                                    Name: {event.title}
                                </div>
                                <div>
                                    Duration: {event.time}
                                </div>
                                <div>
                                    Location: {event.location}
                                </div>
                                <div>
                                    Budget: ${event.budget.toFixed(2)}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default TripCard
