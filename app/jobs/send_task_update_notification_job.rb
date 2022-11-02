class SendTaskUpdateNotificationJob < SendEmailJob
  sidekiq_options lock: :until_executed, on_conflict: { client: :log, server: :raise }

  def perform(task_id)
    task = Task.find_by(id: task_id)
    return if task.blank?

    UserMailer.with(user: task.author, task: task).task_updated.deliver_now
  end
end
