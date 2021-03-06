class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :start_date, :end_date, :img_url, :user_trip, :user_can_modify

  has_many :members
  has_many :events  

  def user_trip
    current_user&.user_trips&.find_by(trip_id: object.id)
  end

  def user_can_modify
    current_user.admin? || object.user == current_user
  end

end
