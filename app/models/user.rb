class User < ApplicationRecord
  has_secure_password

  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: /@/ }

  def generate_password_token!
    token = signed_id(purpose: :password_reset, expires_in: 1.second)
    self.reset_password_token = token
    self.reset_password_created_at = Time.now.utc
    save!
    token
  end

  def reset_password_token!
    self.reset_password_token = nil
    save!
  end

  def password_token_valid?
    (reset_password_created_at + 24.hours) > Time.now.utc
  end
end
