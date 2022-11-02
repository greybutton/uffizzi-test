require 'test_helper'

class Api::V1::Tasks::ImagesControllerTest < ActionController::TestCase
  def after_teardown
    super

    remove_uploaded_files
  end

  test 'should put attach image' do
    author = create(:user)
    task = create(:task, author: author)

    patch :update, params: { task_id: task.id, attachment: get_attachment_params, format: :json }
    assert_response :success

    task.reload
    assert task.image.attached?
  end

  test 'sould delete destroy' do
    author = create(:user)
    task = create(:task, author: author)

    put :update, params: { task_id: task.id, attachment: get_attachment_params, format: :json }
    task.reload

    assert task.image.attached?

    delete :destroy, params: { task_id: task.id, format: :json }
    task.reload

    assert_not task.image.attached?
  end

  private

  def get_attachment_params
    image = file_fixture('image.jpg')
    {
      image: fixture_file_upload(image, 'image/jpeg'),
      crop_x: 190,
      crop_y: 100,
      crop_width: 300,
      crop_height: 300,
    }
  end

  def remove_uploaded_files
    FileUtils.rm_rf(ActiveStorage::Blob.service.root)
  end
end
