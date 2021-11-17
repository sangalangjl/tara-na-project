import { useState, useEffect, useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'

const EventCard = ({eventId, cancelEvent, addParticipantFromEvent, removeParticipantFromEvent}) => {
    const [event, setEvent] = useState(null)
    const history = useHistory()

    const fetchEventCallback = useCallback(
        () => {
            fetch(`/events/${eventId}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(event => setEvent(event))
        }, 
        [eventId],
    )

    useEffect(() => {
        fetchEventCallback()
    }, [fetchEventCallback])

    const cancelEventBtn = (event) => {
        if (event.user_can_modify) {
            return (
                <button onClick={handleCancel}>Cancel Event</button>
            )
        }
    }

    const handleCancel = (e) => {
        cancelEvent(event.id)
        history.push('/events')
    }
    
    const joinEventBtn = (event) => {
        if (event.user_event) {
            return (
                <button onClick={() => {
                    removeParticipantFromEvent(event.id).then(() => fetchEventCallback())
                }}>
                    Leave Event
                </button>
            )
        } else {
            return (
                <button onClick={() => {
                    addParticipantFromEvent(event.id).then(() => fetchEventCallback())
                }
            }>
                Join Event
            </button>
            )
        }
    }

    if (!event) { return <div></div>}

    return (
        <>
            <div className="EventCardPage"> 
                <div className="EventCardName">
                    <h1>{event.title}</h1>
                </div>
                <div>
                    <img src={event.trip.img_url} alt={event.trip.img_url}/>
                </div>
                <div className="LeaveOrJoinEventBtn">
                    {joinEventBtn(event)}
                </div>
                <div className="ParticipantsContainer">
                    <div className="ParticipantsText">
                        <h2>Participants ({event.participants?.length})</h2>
                    </div>
                    <div className="ParticipantsList">
                        {event.participants?.map(participant => (
                            <div key={participant.id} className="ParticipantListDetails">
                                <div className="ParticipantImg">
                                    <img src={participant.img_url} alt={participant.img_url}/>
                                </div>
                                <div className="ParticipantFullNameText">
                                    {participant.first_name} {participant.last_name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="EventDetails">
                    <div className="EventTimeText">
                        <h3>Time: {event.time}</h3>
                    </div>
                    <div className="EventLocationText">
                        <h4>Location: {event.location}</h4>
                    </div>
                    <div className="EventDescriptionText">
                        <h4>Description: {event.description}</h4>
                    </div>
                    <div className="EventBudgetText">
                        <h4>Budget: ${event.budget.toFixed(2)}</h4>
                    </div>
                    <div className="EventCreatedByText">
                        <h5>Created by {event.creator} for <Link to={`/trips/${event.trip.id}`}>{event.trip.name}</Link></h5>
                    </div>
                    <div className="EventCancelBtn">
                        {cancelEventBtn(event)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard
