import React from 'react'

const TripCard = ({trip}) => {
    const {name, location, start_date, end_date} = trip

    return (
        <div>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <h3>{location}</h3>
            </div>
            <div>
                <h4>{start_date} to {end_date}</h4>
            </div>
        </div>
    )
}

export default TripCard
