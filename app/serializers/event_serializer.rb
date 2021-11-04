class EventSerializer < ActiveModel::Serializer
  attributes :creator, :title, :description, :location, :budget, :start_time, :end_time
  has_many :attendees
  belongs_to :trip, serializer: EventTripSerializer

  def creator
    object.user.username
  end
end
