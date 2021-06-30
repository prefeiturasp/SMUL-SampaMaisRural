#!/bin/bash



# app related
export RAILS_ENV=<development ou staging ou production>
export SECRET_KEY=aaa6e1409919b03a7817f577133d69d06dd2cfdb29f64cc46f4245d9a8edcbdc2fddf328401bcb32268abb19a3be58d345838b461e2399af0846aabd40b21232
export EMAIL_SENDER=<endereço que enviará emails>
export SMTP_DOMAIN=<dominio do email>
export EMAIL_SENDER_PASS=<senha do endereço de email no smtp>
export SMTP_ADDRESS=<endereço do servidor smtp>
export ELASTICSEARCH_URL=<url do servidor ES>
export APP_HOST=<dominio ex https://host.com.br>
export SMTP_PORT=<porta do servidor smtp>

export POSTGRES_DB=<nome do banco principal>
export POSTGRES_DB_TEST=<nome do banco de teste>
export POSTGRES_HOST=<endereço do banco>
export POSTGRES_PORT=<porta do banco>
export POSTGRES_USER=<usuário do banco>
export POSTGRES_PASS=<senha do banco>
export UPLOADS_FOLDER=<pasta de uploads>


# instala dependencias
bundle install

# deve ser executado apenas 1 vez, na nova máquina
# é responsável por definir rotinas do cron
bundle exec whenever --update-crontab

bundle exec rake searchkick:reindex:all

bundle exec rake assets:precompile # só para produção ou staging

#  inicia o puma
bundle exec puma -p 3000 -e <development ou staging ou production>
