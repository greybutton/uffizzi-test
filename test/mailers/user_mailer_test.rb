require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  include Rails.application.routes.url_helpers

  setup do
    @user = create(:user)
    @task = create(:task, author: @user)
  end

  test 'task created' do
    params = { user: @user, task: @task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_later
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [@user.email], email.to
    assert_equal 'New Task Created', email.subject
    assert email.body.to_s.include?("Task #{@task.id} was created")
  end

  test 'task updated' do
    params = { user: @user, task: @task }
    email = UserMailer.with(params).task_updated

    assert_emails 1 do
      email.deliver_later
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [@user.email], email.to
    assert_equal 'Task Updated', email.subject
    assert email.body.to_s.include?("Task #{@task.id} was updated")
  end

  test 'task deleted' do
    params = { user: @user, task_id: @task.id }
    email = UserMailer.with(params).task_deleted

    assert_emails 1 do
      email.deliver_later
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [@user.email], email.to
    assert_equal 'Task Deleted', email.subject
    assert email.body.to_s.include?("Task #{@task.id} was deleted")
  end

  test 'reset password' do
    params = { user: @user }
    email = UserMailer.with(params).reset_password

    assert_emails 1 do
      email.deliver_later
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [@user.email], email.to
    assert_equal 'Password reset', email.subject
    assert email.body.to_s.include?(reset_password_path)
  end
end
