class Web::RequestPasswordResetsController < Web::ApplicationController
  def new
    @request_password_reset_form = RequestPasswordResetForm.new
  end

  def create
    @request_password_reset_form = RequestPasswordResetForm.new(request_params)

    if @request_password_reset_form.valid?
      SendPasswordResetNotificationJob.perform_async(@request_password_reset_form.user.id)
      flash_message = "A password reset link was sent to #{request_params[:email]}."
      redirect_to(:new_session, flash: { success: flash_message })
    else
      render(:new)
    end
  end

  private

  def request_params
    params.require(:request_password_reset_form).permit(:email)
  end
end
