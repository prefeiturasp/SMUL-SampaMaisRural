class Api::ThemesController < ApplicationController
  def index
    @themes = PostTheme.all.includes(:posts).joins(:posts)
  end
end
