import 'dotenv/config';
import { cleanEnv, num, str } from 'envalid';

const envConfig = cleanEnv(process.env, {
  PORT: num({
    default: 8080,
  }),
  DATABASE_URL: str({
    default: '',
  }),
});

export default envConfig;
