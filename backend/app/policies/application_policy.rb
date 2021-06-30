class ApplicationPolicy < Struct.new(:user, :record)

  def index?
    has_role?
  end

  def show?
    true
  end

  def create?
    has_role?
  end

  def new?
    create?
  end

  def update?
    has_role?
  end

  def edit?
    update?
  end

  def destroy?
    user.has_role?(:admin)
  end

  def disable?
    destroy?
  end

  def as_zip?
    true
  end

  def download?
    true
  end

  private

  def has_role?
    user.has_role?(record) or user.has_role?(record.to_s.underscore) or user.has_role?(record.class) or user.has_role?(:admin) or user == record
  end

  class Scope < Struct.new(:user, :scope)
    def resolve
      scope.all
    end
  end
end
