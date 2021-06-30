json.theme @theme.name if @theme
json.total_pages @posts.total_pages
json.total_count @posts.total_count
json.posts do
  json.array! @posts do |post|
    json.id post.id
    json.title post.title
    json.description post.description
    json.photo_url post.photo_url
    json.file_url post.file_url
    json.link post.link
  end
end
