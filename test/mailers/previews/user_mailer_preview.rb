# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def task_created
    UserMailer.with(get_task_email_params).task_created
  end

  def task_updated
    UserMailer.with(get_task_email_params).task_updated
  end

  def task_deleted
    task, user = get_task_email_params
    UserMailer.with({ user: user, task_id: task }).task_deleted
  end

  def reset_password
    user = User.first
    UserMailer.with({ user: user }).reset_password
  end

  private

  def get_task_email_params
    user = User.first
    task = Task.first
    { user: user, task: task }
  end
end
