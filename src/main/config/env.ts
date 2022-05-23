export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/diario-de-sentimentos-db',
  port: process.env.PORT || 5050
}
