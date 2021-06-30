namespace :certificates do
  desc "certificates tasks"

  task setup: :environment do
    certificate = Certificate.find_by name: "Protocolo de Transição Agroecológica"
    if certificate
      certificate.attachment = File.open('public/certificates/transicao-agroecologica.png')
      certificate.save
    end
    certificate = Certificate.find_by name: "Orgânico por Auditoria"
    if certificate
      certificate.attachment = File.open('public/certificates/organico-por-auditoria.png')
      certificate.save
    end
    certificate = Certificate.find_by name: "Orgânico OCS - Organização de Controle Social"
    if certificate
      certificate.attachment = File.open('public/certificates/controle-social.png')
      certificate.save
    end
    certificate = Certificate.find_by name: "Orgânico Participativo"
    if certificate
      certificate.attachment = File.open('public/certificates/sistema-participativo.jpeg')
      certificate.save
    end

    certificate = Certificate.find_or_create_by name: "Alimentos da Sociobiodiversidade"
    certificate.attachment = File.open('public/certificates/diversidade.png')
    certificate.save
  end
end
