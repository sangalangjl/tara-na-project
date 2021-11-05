import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsList from './EventsList'
import EventCard from './EventCard'

const EventsContainer = () => {
    const [events, setEvents] = useState([])
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch("/events")
            .then(res => res.json())
            .then(events => setEvents(events))
        fetch(`/trips`)
            .then(res => res.json())
            .then(trips => setTrips(trips))
    }, [])

    const removeParticipantFromEvent = (eventId) => {
        const event = events.find(event => event.id === eventId)
        return fetch(`user_events/${event.user_event.id}`, {
            method: "DELETE"
        })
            .then (res => {
                if (res.ok) {
                    const updatedEvents = events.map((event) => {
                        if (event.id === eventId) {
                            return {
                                ...event,
                                user_event: undefined
                            }
                        } else {
                            return event
                        }
                    })
                    setEvents(updatedEvents)
                }
            })
    }
    
    const cancelEvent = (eventId) => {
        return fetch(`/events/${eventId}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    const updatedEvents = events.filter(event => event.id !== eventId)
                    setEvents(updatedEvents)
                }
            })
    }

    const createEvent = (formData) => {
        return fetch("/events", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(errors => Promise.reject(errors))
                }
            })
            .then(event => {
                setEvents(events.concat(event))
            })
    }

    const addParticipantFromEvent = (eventId) => {
        return fetch(`user_events`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_id: eventId
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(errors => Promise.reject(errors))
                }
            })
            .then(userEvent => {
                const updatedEvents = events.map((event) => {
                    if (event.id === eventId) {
                        return {
                            ...event, 
                            user_event: userEvent
                        }
                    } else {
                        return event
                    }
                })
                setEvents(updatedEvents)
            })
    }

    return (
        <div>
            <Switch>
                <Route exact path="/events">
                    <EventsList 
                        events={events}
                        trips={trips}
                        cancelEvent={cancelEvent}
                        createEvent={createEvent}
                        addParticipantFromEvent={addParticipantFromEvent}
                        removeParticipantFromEvent={removeParticipantFromEvent}
                    />
                </Route>
                <Route exact path="/events/:id"
                render={({ match }) => {
                    return (
                        <EventCard 
                            eventId={match.params.id}
                            cancelEvent={cancelEvent}
                            addParticipantFromEvent={addParticipantFromEvent}
                            removeParticipantFromEvent={removeParticipantFromEvent}
                        />
                    )
                }}
                />
            </Switch>
        </div>
    )
}

export default EventsContainer
