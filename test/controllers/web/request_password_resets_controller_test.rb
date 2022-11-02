require 'test_helper'

class Web::RequestPasswordResetsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)

    params = { email: user.email }

    assert_emails 1 do
      post :create, params: { request_password_reset_form: params }
    end

    assert_response :redirect
  end
end
