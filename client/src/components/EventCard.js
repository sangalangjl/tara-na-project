import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const EventCard = ({eventId, cancelEvent}) => {
    const [event, setEvent] = useState(null)
    const history = useHistory()

    const fetchEventCallback = useCallback(
        () => {
            fetch(`/events/${eventId}`)
                .then(res => res.json())
                .then(event => setEvent(event))
        }, [eventId]
    )

    useEffect(() => {
        fetchEventCallback()
    }, [fetchEventCallback])

    const handleCancel = (e) => {
        cancelEvent(event.id)
        history.push('/events')
    }

    const cancelEventBtn = (event) => {
        if (event.user_can_modify) {
            return (
                <button onClick={handleCancel}>Cancel Event</button>
            )
        }
    }

    if (!event) { return <div></div>}

    return (
        <div>
            <h1>{event.title}</h1>
            {cancelEventBtn}
            {/* <small>Created by {event.creator} for <Link to={`/trips/${event.trip.id}`}>{event.trip.name}</Link></small> */}
            <p>{event.description}</p>
            <p>{event.time}</p>
            <p>Location: {event.location}</p>
            {/* <ul>
                {event.attendees.map(attendee => (
                    <li>{attendee.username}</li>
                ))}
            </ul> */}
        </div>
    )
}

export default EventCard
