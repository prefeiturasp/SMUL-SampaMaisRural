module Download
  class SourceBase
    attr_accessor :name, :description, :publishable, :query, :logo, :icon, :csv, :json, :template_name

    class << self
      def all
        @bases ||= load_bases
      end

      private

      def load_bases
        YAML.load_file('config/reports.yml').map { |report_data| new(report_data) }
      end
    end

    def initialize config
      %w[name description query logo icon csv json].each do |attribute|
        self.send("#{attribute}=", config[attribute])
      end
      self.publishable = (config["publishable"] || ::Partner).to_s.camelcase.constantize
      self.template_name = config["template"]
    end

    def template
      @template ||= Template.new(template_name, publishable)
    end

    def self.to_json reports
      reports.map { |report| {
        name: report.name,
        csv: report.link_for('csv'),
        json: report.link_for('json'),
        icon: (report.icon || report.publishable.name.downcase),
        description: report.description,
        logo: "#{ Rails.configuration.action_controller.asset_host }/reports/#{ report.logo }",
        attributes: report.attributes
      }}
    end

    def slug
      name.parameterize
    end

    def link_for extension
      self.send(extension) || Rails.configuration.action_controller.asset_host + '/api/data_reports/' + slug + '.' + extension
    end

    def attributes
      template.attributes.map { |attribute| Attribute.new(publishable, attribute)}
    end

    def to_csv
      content = CSV.generate(headers: true, col_sep: ';') do |csv|
        csv << template.headers
        partners.each do |partner|
          line = []
          template.attributes.each do |attribute|
            value = nil
            value = partner.send(attribute)
            value = value.is_a?(Array) ? value.join(', ') : value
            value = (value.is_a?(TrueClass) || value.is_a?(FalseClass)) ? (value ? 'Sim' : 'Não') : value # TODO fix
            line << value
          end
          csv << line
        end
      end
      "\uFEFF" + content
    end

    def partners
      publishable.search!('*', { where: query.to_h.symbolize_keys }).map { |partner| Download::Partner.new(partner) }
    end

    class Attribute < Struct.new(:publishable, :field)
      def label
        I18n.t('source_bases.partner')[field.to_sym]
      end

      def as_json opts = {}
        {
          label: label,
          kind: I18n.t('types.chars_sequence'),
          description: I18n.t('types')[field] || "-"
        }
      end
    end
  end
end
