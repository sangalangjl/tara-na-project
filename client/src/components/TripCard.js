import React from 'react'
import {ImCross} from 'react-icons/im'

const TripCard = ({trip, handleDeleteTrip}) => {
    const {id, name, location, start_date, end_date, img_url} = trip
    
    const handleDeleteClick = () => {
        fetch(`/trips/${id}`, {
            method: "DELETE"
        });
        handleDeleteTrip(id)
    }

    return (
        <div className="TripCardContainer">
            <div className="TripCardImg">
                <img src={img_url} alt={img_url}/>
            </div>
            <div className="TripDetails">
                <h2 className="TripName">{name}</h2>
                <h3 className="TripLocation">{location}</h3>
                <h4 className="TripDuration">Duration: {start_date} to {end_date}</h4>
                <ImCross className="RemoveIcon" onClick={handleDeleteClick}/>
            </div>
        </div>
    )
}

export default TripCard
