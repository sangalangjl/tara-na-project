class TripsController < ApplicationController

  # GET /trips
  def index
    render json: Trip.all
  end

  # GET /trips/1
  def show
    trip = Trip.find(params[:id])
    render json: trip, status: :ok
  end

  # POST /trips
  def create
    trip = Trip.new(trip_params)
    if trip.save
      render json: trip, status: :created
    else
      render json: trip.errors, status: :unprocessable_entity
    end
  end


  private
    # Only allow a list of trusted parameters through.
    def trip_params
      params.permit(:name, :location, :start_date, :end_date, :img_url)
    end
end
