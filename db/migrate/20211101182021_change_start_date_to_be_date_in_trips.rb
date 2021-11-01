class ChangeStartDateToBeDateInTrips < ActiveRecord::Migration[6.1]
  def change
    change_column :trips, :start_date, :date
  end
end
