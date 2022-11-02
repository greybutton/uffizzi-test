class Task < ApplicationRecord
  has_one_attached :image

  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true
  validates :description, presence: true, length: { maximum: 500 }
  validates :author, presence: true

  state_machine :state, initial: :new_task do
    event :develop do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :archive do
      transition [:new_task, :released] => :archived
    end

    event :qa_check do
      transition in_development: :in_qa
    end

    event :review_code do
      transition in_qa: :in_code_review
    end

    event :ready_for_release do
      transition in_code_review: :ready_for_release
    end

    event :release do
      transition ready_for_release: :released
    end
  end
end
