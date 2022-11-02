# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost.com')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email#{i}@mail.gen"
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = "#{i}"
  u.save
end

task_statuses = [:new_task, :in_development, :in_qa, :in_code_review, :ready_for_release, :released, :archived]

author = Manager.new(email: 'manager@test.com', first_name: 'manager', last_name: 'first', password: '123')
author.save

assignee = Developer.new(email: 'developer@test.com', first_name: 'developer', last_name: 'first', password: '123')
assignee.save

40.times do |i|
  t = Task.new
  t.name = "Task_#{i}"
  t.description = "Description #{i}"
  t.author = author
  t.assignee = assignee
  t.state = task_statuses.sample
  t.expired_at = Time.at(i.day.seconds.to_i + Time.now.to_i).to_date
  t.save
end