class ResetPasswordForm
  include ActiveModel::Model

  attr_accessor(
    :password,
    :password_confirmation,
  )

  validates :password, presence: true
  validates :password_confirmation, presence: true
  validate :form_valid?

  private

  def form_valid?
    if password != password_confirmation
      errors.add(:password_confirmation, 'Password mismatch')
    end
  end
end
