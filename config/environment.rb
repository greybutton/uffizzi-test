# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Rails.application.routes.default_url_options = { host: ENV.fetch('DEFAULT_HOST', 'localhost'), port: ENV.fetch('DEFAULT_PORT', 3000) }
