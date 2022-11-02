class Api::V1::Tasks::ImagesController < Api::V1::Tasks::ApplicationController
  def update
    task = Task.find(params[:task_id])
    task_attach_image_form = TaskAttachImageForm.new(attachment_params)

    if task_attach_image_form.invalid?
      respond_with(task_attach_image_form)
      return
    end

    image = task_attach_image_form.processed_image
    task.image.attach(image)

    respond_with(task, serializer: TaskSerializer)
  end

  def destroy
    task = Task.find(params[:task_id])
    task.image.purge

    respond_with(task, serializer: TaskSerializer)
  end

  private

  def attachment_params
    params.require(:attachment).permit(:image, :crop_width, :crop_height, :crop_x, :crop_y)
  end
end
