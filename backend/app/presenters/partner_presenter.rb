class PartnerPresenter < SimpleDelegator
  attr_reader :partner

  def initialize partner
    @partner = partner
    __setobj__(partner)
  end

  def tag_list
    partner.tag_list.to_a.delete_if { |tag| tag == "Tradicional" }
  end
end
