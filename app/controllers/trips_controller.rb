class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :destroy]
  before_action :authorize_user, only: [:destroy]

  # GET /trips
  def index
    render json: Trip.all
  end

  # GET /trips/1
  def show
    render json: @trip
  end

  # POST /trips
  # def create
  #   trip = Trip.new(trip_params)
  #   if trip.save
  #     render json: trip, status: :created
  #   else
  #     render json: trip.errors, status: :unprocessable_entity
  #   end
  # end

  def create
    trip = current_user.created_trips.new(trip_params)
    if trip.save
      render json: trip, status: :created
    else
      render json: trip.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @trip.destroy
  end


  private
    # Only allow a list of trusted parameters through.
    def trip_params
      params.permit(:name, :location, :start_date, :end_date, :img_url, :user_id)
    end

    def set_trip
      @trip = Trip.find(params[:id])
    end

    def authorize_user
      user_can_modify = current_user.admin? || @trip.user == current_user
      if !user_can_modify
        render json: { error: "You don't have permission to perform that action" }, status: :forbidden
      end
    end
end
