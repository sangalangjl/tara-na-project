import {useState, useEffect} from 'react'
import PastTrips from './PastTrips'
import UpcomingTrips from './UpcomingTrips'
import NewTripForm from './NewTripForm'
import TripCard from './TripCard'

const TripContainer = ({user, getTrips, setGetTrips, errors, setErrors}) => {

    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(trips => setGetTrips(trips))
    }, [setGetTrips])

    const displayTrips = getTrips.map((trip) => <TripCard trip={trip} key={trip.id}/>)

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
                    {displayTrips}
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
