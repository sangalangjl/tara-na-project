import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsList from './EventsList'
import EventCard from './EventCard'

const EventsContainer = () => {
    const [events, setEvents] = useState([])
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch(`/events`)
            .then(res => res.json())
            .then(events => setEvents(events))
        fetch(`/trips`)
            .then(res => res.json())
            .then(trips => setTrips(trips))
    }, [])
    
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

    return (
        <div>
            <Switch>
                <Route exact path="/events">
                    <EventsList 
                        events={events}
                        trips={trips}
                        cancelEvent={cancelEvent}
                        createEvent={createEvent}
                    />
                </Route>
                <Route exact path="/events/:id"
                render={({ match }) => {
                    return (
                        <EventCard 
                            eventId={match.params.id}
                            cancelEvent={cancelEvent}
                        />
                    )
                }}
                />
            </Switch>
        </div>
    )
}

export default EventsContainer
