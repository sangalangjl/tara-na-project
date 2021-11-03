class EventSerializer < ActiveModel::Serializer
  attributes :creator
  has_many :attendees
  belongs_to :trip, serializer: EventTripSerializer

  def creator
    object.user.username
  end
end
