class CommentMailer < ApplicationMailer
  def approved comment
    @comment = comment
    mail subject: "Comentário aprovado  na Sampa+Rural",
      to: @comment.email
  end
end
