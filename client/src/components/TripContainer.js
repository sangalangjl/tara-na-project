import {useEffect, useState} from 'react'
import NewTripForm from './NewTripForm'
import TripCard from './TripCard'

const TripContainer = ({user, trips, setTrips, errors, setErrors, handleDeleteTrip}) => {


    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(setTrips)
    }, [])

    const displayTrips = trips.map((trip) => <TripCard trip={trip} key={trip.id} handleDeleteTrip={handleDeleteTrip} />)

    return (
        <div>
            <div>
                <div>
                    <h2>Trips</h2>
                </div>
                <div>
                    <button>+ New Trip</button>
                    <NewTripForm 
                        errors={errors} 
                        setErrors={setErrors} 
                    />
                </div>
            </div> 
            <div>
                <div>
                    <button>Upcoming</button>
                    <div className="TripList">
                        {displayTrips}
                    </div>
                </div>
                {/* <div>
                    <button>Past</button>
                    {displayTrips}
                </div> */}
            </div> 
        </div>
    )
}

export default TripContainer
