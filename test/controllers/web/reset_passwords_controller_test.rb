require 'test_helper'

class Web::ResetPasswordsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)
    token = user.generate_password_token!

    params = { password: 'newpwd', password_confirmation: 'newpwd' }
    post :create, params: { token: token, reset_password_form: params }

    assert_response :redirect
  end
end
