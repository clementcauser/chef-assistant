export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || "3333", 10),
  mongoDbUrl: process.env.MONGO_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
});
