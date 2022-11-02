ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'simplecov'
require 'simplecov-lcov'
require 'sidekiq/testing'

Sidekiq::Testing.inline!

if ENV['CI']
  SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true
  SimpleCov::Formatter::LcovFormatter.config do |c|
    c.lcov_file_name = 'lcov.info'
    c.single_report_path = './coverage/lcov.info'
  end
  SimpleCov.formatter = SimpleCov::Formatter::LcovFormatter
  SimpleCov.start
end

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  include FactoryBot::Syntax::Methods
  include AuthHelper
  include ActionMailer::TestHelper
end
