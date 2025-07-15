#!/bin/bash

DB_NAME="soclose"
DB_USER="soclose_user"
DB_PASS="soclose_pass"
TABLE_NAME="gardens"
CSV_FILE="data.csv"
DB_HOST="localhost"

export PGPASSWORD="$DB_PASS"

psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "\COPY $TABLE_NAME(name, district) FROM '$CSV_FILE' DELIMITER ',' CSV HEADER;"

unset PGPASSWORD
