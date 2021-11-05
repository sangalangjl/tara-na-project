class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :start_date, :end_date, :img_url, :user_trip

  has_many :members
  has_many :events

  def user_trip
    @current_user&.user_trips&.find_by(trip_id: object.id)
  end
end
