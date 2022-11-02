class Web::ResetPasswordsController < Web::ApplicationController
  def new
    @reset_password_form = ResetPasswordForm.new
    @token = params[:token]
  end

  def create
    @reset_password_form = ResetPasswordForm.new(reset_password_params)

    if !@reset_password_form.valid?
      @token = params[:token]
      return render(:new)
    end

    user = User.find_by(reset_password_token: params[:token])

    if !user.blank? && user.update(reset_password_params)
      user.reset_password_token!
      redirect_to(:new_session, flash: { success: 'Password was reset successfully.' })

    else
      redirect_to(:new_request_password_reset, flash: { warning: 'Unable to reset password. Please try again.' })
    end
  end

  private

  def reset_password_params
    params.require(:reset_password_form).permit(:password, :password_confirmation)
  end
end
