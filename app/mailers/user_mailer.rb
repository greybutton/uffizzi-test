class UserMailer < ApplicationMailer
  default from: 'noreply@taskmanager.com'

  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New Task Created')
  end

  def task_updated
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task Updated')
  end

  def task_deleted
    user = params[:user]
    @task_id = params[:task_id]

    mail(to: user.email, subject: 'Task Deleted')
  end

  def reset_password
    user = params[:user]
    @token = user.generate_password_token!

    mail(to: user.email, subject: 'Password reset')
  end
end
