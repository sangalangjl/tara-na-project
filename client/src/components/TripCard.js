import React from 'react'

const TripCard = ({trip}) => {
    const {name, location, start_date, end_date, img_url} = trip

    return (
        <div className="TripCardContainer">
            <div className="TripCardImg">
                <img src={img_url} alt={img_url}/>
            </div>
            <div className="TripDetails">
                <h2 className="TripName">{name}</h2>
                <h3 className="TripLocation">{location}</h3>
                <h4 className="TripDuration">Duration: {start_date} to {end_date}</h4>
            </div>
        </div>
    )
}

export default TripCard
