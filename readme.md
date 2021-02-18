# API (Backend) del proyecto SensorDatos con NodeJS + MongoDB

# Creación de la BD
docker run --name mongo -d -p 27017:27017 mongo

# Fichero .env de ejemplo:

URL_BASEDATOS='mongodb://localhost:27017/datossensor'

PUERTO=3000

TOKEN_SECRETO='111111111111111111'
