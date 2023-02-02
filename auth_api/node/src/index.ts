import Config, { ConfigType } from './config/config';
import app from './server';

let config: ConfigType = Config;

app.listen(config.port, function () {
  console.log('listening at', config.port);
});
