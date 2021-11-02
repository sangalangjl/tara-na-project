class AddImageToTrips < ActiveRecord::Migration[6.1]
  def change
    add_column :trips, :img_url, :string
  end
end
