source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.0'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'
gem 'simple_form'
gem 'state_machines'
gem 'state_machines-activerecord'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails'
  gem 'rubocop'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  gem 'bullet', '~> 6.1', '>= 6.1.5'
  gem 'letter_opener', '~> 1.7'
  gem 'letter_opener_web', '~> 2.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  gem 'simplecov', require: false
  gem 'simplecov-lcov', '~> 0.8.0', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'slim-rails'

gem 'kaminari'
gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'responders'
gem 'active_model_serializers'

gem 'webpacker-react', '0.3.2'
gem 'js-routes'

gem 'rollbar', '~> 3.3'
gem 'newrelic_rpm', '~> 8.1'
gem 'sidekiq', '~> 6.3', '>= 6.3.1'
gem 'sidekiq-failures', '~> 1.0', '>= 1.0.1'
gem 'sidekiq-throttled', '~> 0.13.0'
gem 'sidekiq-unique-jobs', '~> 7.1', '>= 7.1.8'

gem 'mini_magick', '~> 4.11'
gem 'virtus', '~> 2.0'
gem 'file_validators', '~> 3.0'
