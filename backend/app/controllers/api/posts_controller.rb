class Api::PostsController < ApplicationController
  def index
    @theme = PostTheme.find_by(name: params[:name]) if params[:name]
    @posts = (@theme&.posts || Post).page(params[:page] || 1).per(16)
  end
end
