class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text           :body, null: false
      t.string         :image
      t.integer        :group_id, unique: true
      t.integer        :user_id
      t.timestamps     null: false
    end
  end
end
