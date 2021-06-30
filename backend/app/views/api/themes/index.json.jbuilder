json.themes do
  json.array! @themes do |theme|
    json.name theme.name
    json.posts_count theme.posts.size
    json.posts do
      json.array! theme.posts.order('id desc').first(4) do |post|
        json.id post.id
        json.title post.title
        json.description post.description
        json.photo_url post.photo_url
        json.file_url post.file_url
        json.link post.link
      end
    end
  end
end
