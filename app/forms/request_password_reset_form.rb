class RequestPasswordResetForm
  include ActiveModel::Model

  attr_accessor(
    :email,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :email_valid?

  def user
    User.find_by(email: email)
  end

  private

  def email_valid?
    if user.blank?
      errors.add(:email, 'The specified email address was not found')
    end
  end
end
