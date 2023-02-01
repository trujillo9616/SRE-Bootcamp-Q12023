export default interface Config {
  port: number;
  environment: string;
  db?: {
    host: string;
    port: number;
    name: string;
  };
  jwt?: {
    secret: string;
  };
}
