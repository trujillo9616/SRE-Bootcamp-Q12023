import dotenv from 'dotenv';
dotenv.config();

export interface ConfigType {
  port: number | string;
  environment: string;
  jwt_secret: string;
  database_url: string;
}

const config: ConfigType = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  jwt_secret: process.env.JWT_SECRET || 'secret',
  database_url: process.env.DATABASE_URL || 'mysql://user:secret@localhost:3306/mydb',
}

export default config;
