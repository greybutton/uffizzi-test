class Api::V1::TasksController < Api::V1::ApplicationController
  def index
    tasks = Task.includes([:assignee, :author]).
      with_attached_image.
      ransack(ransack_params).
      result.
      page(page).
      per(per_page)

    respond_with(tasks, each_serializer: TaskSerializer, root: 'items', meta: build_meta(tasks))
  end

  def show
    task = Task.with_attached_image.find(params[:id])

    respond_with(task, serializer: TaskSerializer)
  end

  def create
    task = current_user.my_tasks.new(task_params)

    if task.save
      SendTaskCreateNotificationJob.perform_async(task.id)
    end

    respond_with(task, serializer: TaskSerializer, location: nil)
  end

  def update
    task = Task.find(params[:id])

    if task.update(task_params)
      SendTaskUpdateNotificationJob.perform_async(task.id)
    end

    respond_with(task, serializer: TaskSerializer)
  end

  def destroy
    task = Task.find(params[:id])

    if task.destroy
      SendTaskDeleteNotificationJob.perform_async(task.author.id, task.id)
    end

    respond_with(task)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :author_id, :assignee_id, :state, :expired_at, :state_event)
  end
end
