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
        <div>
            <h1>{event.title}</h1>
            {cancelEventBtn(event)}
            <small>Created by {event.creator} for <Link to={`/trips/${event.trip.id}`}>{event.trip.name}</Link></small>
            <p>{event.description}</p>
            <p>{event.time}</p>
            <p>Location: {event.location}</p>
            <p>{joinEventBtn(event)}</p>
            <ul>
                {event.participants.map(participant => (
                    <li key={participant.id} >{participant.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventCard
