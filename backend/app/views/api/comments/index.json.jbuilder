json.comments do
  json.array! @comments do |comment|
    json.name comment.name
    json.email comment.email
    json.updated_at time_ago_in_words comment.updated_at
    json.data comment.data
  end
end
