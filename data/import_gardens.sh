#!/bin/bash

DB_NAME="soclose"
DB_USER="soclose_user"
TABLE_NAME="gardens"
CSV_FILE="data.csv"

psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY $TABLE_NAME(name, district) FROM '$CSV_FILE' DELIMITER ',' CSV HEADER;"