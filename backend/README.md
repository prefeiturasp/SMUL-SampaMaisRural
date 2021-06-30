# SP+Rural API

## Ferramentas
  - `Ruby 2.6.3`
  - `Rails 6`

## Instalação

Siga a [instalação](https://github.com/jurema/sp-rural) do `sp-rural`.

## Importar bases
  - UPAS: `docker-compose run api bundle exec rake etl:import_partners CSV_FILE=<path-do-arquivo-csv> ORIGIN=upa`
  - Feiras orgânicas: `docker-compose run api bundle exec rake etl:import_partners CSV_FILE=<path-do-arquivo-csv> ORIGIN=idec`
  - Geosampa: `docker-compose run api bundle exec rake etl:import_partners CSV_FILE=<path-do-arquivo-csv> ORIGIN=geosampa`
  - Pontos Turísticos: `docker-compose run api bundle exec rake etl:import_partners CSV_FILE=<path-do-arquivo-csv> ORIGIN=tourism`
  - Iniciativas: `docker-compose run api bundle exec rake etl:import_partners CSV_FILE=<path-do-arquivo-csv> ORIGIN=sprural`

