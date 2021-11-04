import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import TripCard from './TripCard'
import TripsList from './TripsList'

const TripContainer = ({user, errors, setErrors}) => {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then((trips) => setTrips(trips))
    }, [])

    const leaveTrip = (tripId) => {
        const userTripId = trips.find(trip => trip.id === tripId).user_trip.id
        return fetch(`/user_trips/${userTripId}`, {
            method: 'DELETE'
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

    // const handleDeleteTrip = (id) => {
    //     const newTrips = trips.filter((trip) => trip.id !== id)
    //     setTrips(newTrips)
    // }
    
    // const displayTrips = trips.map((trip) => <TripCard trip={trip} key={trip.id} />)

    // return (
    //     <div>
    //         <div>
    //             <div>
    //                 <h2>Trips</h2>
    //             </div>
    //             <div>
    //                 <button>+ New Trip</button>
    //                 <NewTripForm 
    //                     errors={errors} 
    //                     setErrors={setErrors} 
    //                 />
    //             </div>
    //         </div> 
    //         <div>
    //             <div>
    //                 <button>Upcoming</button>
    //                 <div className="TripList">
    //                     {displayTrips}
    //                 </div>
    //             </div>
    //             {/* <div>
    //                 <button>Past</button>
    //                 {displayTrips}
    //             </div> */}
    //         </div> 
    //     </div>
    // )

    return (
        <div>
            <Switch>
                <Route exact path="/trips">
                    <TripsList
                        trips={trips}
                        leaveTrip={leaveTrip}
                        joinTrip={joinTrip}
                        createTrip={createTrip}
                    />
                </Route>
                <Route exact path="/trips/:id"
                    render={({ match }) => {
                        return (
                            <TripCard
                                tripId={match.params.id}
                                leaveTrip={leaveTrip}
                                joinTrip={joinTrip}
                            />
                        )
                    }}
                />
            </Switch>
        </div>
    )
}

export default TripContainer
