class UserTripsController < ApplicationController
  # POST /user_trips
  def create
    user_trip = @current_user.user_trips.build(user_trip_params)
    if user_trip.save
      render json: user_trip, status: :created
    else
      render json: user_trip.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_trips/1
  def destroy
    UserTrip.find(params[:id])
  end

  private
    # Only allow a list of trusted parameters through.
    def user_trip_params
      params.permit(:trip_id)
    end
end
