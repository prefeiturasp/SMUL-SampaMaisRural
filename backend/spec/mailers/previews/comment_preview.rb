class CommentPreview < ActionMailer::Preview
  def approved
    CommentMailer.approved(Comment.last)
  end
end
