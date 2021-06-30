# class MyParser < ActsAsTaggableOn::GenericParser
#   def parse
#     ActsAsTaggableOn::TagList.new.tap do |tag_list|
#       tag_list.add @tag_list.split(';')
#     end
#   end
# end
# ActsAsTaggableOn.default_parser = MyParser

ActsAsTaggableOn.delimiter = [';']
