module ActiveAdmin
  class PagePolicy < ApplicationPolicy
    def show?
      case record.name
      when "FilterManagement"
        user.has_role?(:admin)
      when "SourceManagement"
        user.has_role?(:admin)
      when "About"
        user.has_role?(:admin)
      else
        super
      end
    end
  end
end
