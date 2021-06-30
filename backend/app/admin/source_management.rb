ActiveAdmin.register_page "SourceManagement" do
  menu label: I18n.t('active_admin.source_management'),
  parent: I18n.t("active_admin.management"),
    priority: 9

  content do
    "Futura Carga de planilhas (dados e fotos em bloco)"
  end
end
