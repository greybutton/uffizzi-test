# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc 'Generate js routes for webpack'
  task generate: :environment do
    routes_dir = 'routes'
    FileUtils.mkdir_p(File.join('app', 'javascript', routes_dir))
    file_name = File.join(routes_dir, 'ApiRoutes.js')
    JsRoutes.generate!(file_name, camel_case: true)
  end
end
