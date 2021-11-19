import { useState } from 'react'
import { Link } from 'react-router-dom'
import {ImCross} from 'react-icons/im'

const EventsList = ({ events, trips, cancelEvent, createEvent, addParticipantFromEvent, removeParticipantFromEvent}) => {

    const [toggleNewEvent, setToggleNewEvent] = useState(false)

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [budget, setBudget] = useState(0)
    const [start_time, setStartTime] = useState(now.toISOString().slice(0, 16))
    const [end_time, setEndTime] = useState('')
    const [trip_id, setTripId] = useState('')

    const addOrRemoveBtn = (event) => {
        if (event.user_event) {
            return <button className="LeaveEventBtn" onClick={() => removeParticipantFromEvent(event.id)}>Leave Event</button>
        } else {
            return <button className="JoinEventBtn" onClick={() => addParticipantFromEvent(event.id)}>Join Event</button>
        }
    }

    // const cancelEventBtn = (event) => {
    //     if (event.user_is_creator) {
    //         return <button onClick={() => cancelEvent(event.id)}>Delete Event</button>
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        createEvent({
            title,
            description,
            location,
            budget,
            start_time: start_time,
            end_time: end_time,
            trip_id: trip_id
        })
        setTitle('')
        setDescription('')
        setLocation('')
        setBudget('')
        setStartTime('')
        setEndTime('')
        setTripId('')
    }

    const handleOnClickEventForm = () => {
        setToggleNewEvent(true)
    }

    return (
        <>
            <div className="NewEventContainer">
                <div className="EventsListText">
                    <h2>Events</h2>
                </div>
                <div className="AddEventFormText">
                    <h3 onClick={handleOnClickEventForm}>+ New Event</h3>
                </div>
                    {toggleNewEvent ?
                        <div className="NewEventForm">
                            <div className="NewEventText">
                                <h1>Add a New Event</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title">Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="description">Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                <label htmlFor="budget">Budget:
                                    <input
                                        type="number"
                                        id="budget"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="start_time">Start Time:
                                    <input
                                        type="datetime-local"
                                        name="start_time"
                                        value={start_time}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="end_time">End Time:
                                    <input
                                        type="datetime-local"
                                        name="end_time"
                                        value={end_time}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="trip_id">Trip Name:
                                <input
                                        type="text"
                                        name="trip_id"
                                        value={trip_id}
                                        list="trips"
                                        onChange={(e) => setTripId(e.target.value)}
                                    />
                                </label>
                                <datalist id="trips">
                                    {trips.map(trip => <option value={trip.id}>{trip.name}</option>)}
                                </datalist>
                                <button className="NewEventBtn"type="submit">Add Event</button>
                            </form> 
                            <ImCross className="CloseEventFormBtn" onClick={() => setToggleNewEvent(false)} />
                        </div> : null}
            </div>
            <div className="EventListContainer">
                {events.map(event => (
                    <div className="EventLists">
                        <div className="EventListDetails">
                            <Link to={`/events/${event.id}`}>
                                <div className="EventListTitle">
                                    {event.title}
                                </div>
                                <div className="EventListTime">
                                    {event.time}
                                </div>
                                <div className="EventListTripInfo">
                                    {event.trip.name} (Unique ID: {event.trip.id})
                                </div>
                            </Link>
                            <div className="JoinOrLeaveEventBtn">
                                {addOrRemoveBtn(event)} 
                                {/* {cancelEventBtn(event)} */}
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
        </>
    )
}

export default EventsList
