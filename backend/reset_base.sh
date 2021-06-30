#!/bin/bash

rake etl:import_partners CSV_FILE=generica.xlsx ORIGIN=sprural SHEET="Base genérica v2"
rake etl:import_partners CSV_FILE=generica.xlsx ORIGIN=upa SHEET="Base agricultores v2"
rake etl:import_partners ORIGIN=idec
rake etl:import_partners ORIGIN=geosampa

rake partner:import_attachments DIR=TODAS\ AS\ FOTOS RESET_PHOTOS=true;
rake partner:import_idec_attachments
rake connections:migrate
