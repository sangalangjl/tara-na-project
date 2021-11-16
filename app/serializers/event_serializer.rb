class EventSerializer < ActiveModel::Serializer
  attributes :creator, :id, :title, :description, :location, :budget, :start_time, :end_time, :time, :user_event, :user_can_modify

  has_many :participants
  belongs_to :trip, serializer: EventTripSerializer

  def creator
    "#{object.user.first_name} #{object.user.last_name}"
  end

  def time
    "From #{object.start_time.strftime('%A, %m/%d/%y at %I:%M %p')} to #{object.end_time.strftime('%A, %m/%d/%y at %I:%M %p')}"
  end

  def user_event
    current_user.user_events.find_by(event_id: object.id)
  end

  def user_can_modify
    current_user.admin? || object.user == current_user
  end

end
