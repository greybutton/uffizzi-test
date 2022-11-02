Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  mount Sidekiq::Web, at: '/admin/sidekiq'

  root :to => "web/boards#show"

  scope module: :web do
    resource :board, only: :show
    resource :session, only: [:new, :create, :destroy]

    resources :developers, only: [:new, :create]

    resource :request_password_reset, only: [:new, :create]
    resource :reset_password, only: [:new, :create]
  end

  namespace :admin do
    resources :users
  end

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :tasks, only: [:index, :show, :create, :update, :destroy] do
        resource :image, only: [:update, :destroy], module: :tasks
      end

      resources :users, only: [:index, :show]
    end
  end
end
