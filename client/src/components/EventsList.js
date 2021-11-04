import { useState } from 'react'
import { Link } from 'react-router-dom'

const EventsList = ({ events, trips, cancelEvent, createEvent}) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [budget, setBudget] = useState(0)
    const [start_time, setStartTime] = useState(now.toISOString().slice(0, 16))
    const [end_time, setEndTime] = useState('')

    const DeleteEventBtn = (event) => {
        if (event.user_is_creator) {
            return <button onClick={() => cancelEvent(event.id)}>Delete Event</button>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createEvent({
            title,
            description,
            location,
            budget,
            start_time: start_time,
            end_time: end_time
        })
        setTitle('')
        setDescription('')
        setLocation('')
        setBudget('')
        setStartTime('')
        setEndTime('')
    }

    return (
        <div>
            <div>
                <h1>Events</h1>
                <div>
                    {events.map(event => (
                        <p>
                            <Link to={`events/${event.id}`}>
                                {event.title}
                            </Link>
                            <span>
                            {DeleteEventBtn(event)}
                            </span>
                        </p>
                    ))}
                </div>
            </div>
            <div>
                <h3>Add Event</h3>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        <label>Description:</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        <label>Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        <label>Budget:</label>
                            <input
                                type="text"
                                id="budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                            />
                        <label>Start Time:</label>
                            <input
                                type="datetime-local"
                                id="start_time"
                                value={start_time}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        <label>End Time:</label>
                            <input
                                type="datetime-local"
                                id="end_time"
                                value={end_time}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        <button type="submit">Add Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EventsList
