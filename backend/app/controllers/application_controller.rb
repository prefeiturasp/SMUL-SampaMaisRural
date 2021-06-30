class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :set_paper_trail_whodunnit

  protected

  def user_for_paper_trail
    user_signed_in? ? current_user.try(:id) : 'Unknown user'
  end
end
