class TripIndexSerializer < ActiveModel::Serializer
    attributes :id, :name, :location, :start_date, :end_date, :img_url, :user_group

    def user_group
        current_user&.user_trips&.find_by(trip_id: object.id)
    end
end