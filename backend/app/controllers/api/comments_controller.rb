class Api::CommentsController < ApplicationController

  def index
    @partner = Partner.find(params[:partner_id])
    @comments = @partner.comments.approved.order('id desc')
  end
end
