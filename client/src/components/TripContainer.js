import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import TripCard from './TripCard'
import TripsList from './TripsList'

const TripContainer = ({user, errors, setErrors}) => {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch("/trips", {
            credentials: 'include'
        })
        .then(r => r.json())
        .then(trips => setTrips(trips))
    }, [])

    const leaveTrip = (tripId) => {
        const userTripId = trips.find(trip => trip.id === tripId).user_trip.id
        return fetch(`/user_trips/${userTripId}`, {
            method: 'DELETE', 
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    const updatedTrips = trips.map(trip => {
                        if (trip.id === tripId) {
                            return {
                                ...trip,
                                user_trip: undefined
                            }
                        } else {
                            return trip
                        }
                    })
                    setTrips(updatedTrips)
                }
            })
    }

    const joinTrip = (tripId) => {
        return fetch('/user_trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                trip_id: tripId
            })
            })
            .then(res => {
                if (res.ok) {
                return res.json()
                } else {
                return res.json().then(errors => Promise.reject(errors))
                }
            })
            .then(userTrip => {
                const updatedTrips = trips.map(trip => {
                if (trip.id === tripId) {
                    return {
                    ...trip,
                    user_trip: userTrip
                    }
                } else {
                    return trip
                }
                })
                setTrips(updatedTrips)
            })
    }

    const createTrip = (formData) => {
        return fetch("/trips", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(errors => Promise.reject(errors))
                }
            })
            .then(trip => {
                setTrips(trips.concat(trip))
            })
    }

    const cancelTrip = (tripId) => {
        return fetch(`/trips/${tripId}`, {
            method: "DELETE", 
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    const updatedTrips = trips.filter(trip => trip.id !== tripId)
                    setTrips(updatedTrips)
                }
            })
    }

    return (
        <div>
            <Switch>
                <Route exact path="/trips">
                    <TripsList
                        trips={trips}
                        leaveTrip={leaveTrip}
                        joinTrip={joinTrip}
                        createTrip={createTrip}
                        cancelTrip={cancelTrip}
                    />
                </Route>
                <Route exact path="/trips/:id"
                    render={({ match }) => {
                        return (
                            <TripCard
                                tripId={match.params.id}
                                leaveTrip={leaveTrip}
                                joinTrip={joinTrip}
                                cancelTrip={cancelTrip}
                            />
                        )
                    }}
                />
            </Switch>
        </div>
    )
}

export default TripContainer
