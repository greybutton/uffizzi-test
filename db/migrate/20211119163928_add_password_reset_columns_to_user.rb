class AddPasswordResetColumnsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_created_at, :datetime
  end
end
