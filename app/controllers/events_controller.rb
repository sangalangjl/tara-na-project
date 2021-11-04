class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:update, :destroy]

  # GET /events
  def index
    render json: Event.all, each_serializer: EventIndexSerializer
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    event = @current_user.created_events.build(event_params)
    if event.save
      render json: event, status: :created
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      render json: @event, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    @event.destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def event_params
      params.permit(:title, :description, :location, :budget, :start_time, :end_time, :trip_id)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    def authorize_user
      user_can_modify = @current_user.admin? || @event.user == @current_user
      if !user_can_modify
        render json: { error: "You don't have permission to perform that action" }, status: :forbidden
      end
    end
end
