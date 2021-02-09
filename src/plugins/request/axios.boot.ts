import bootstrap from '../bootstrap';
import { initAxios, setHeader } from '.';
import './reqFilter';
import './resFilter';

bootstrap.on('init', () => {
  initAxios();
});

bootstrap.on('getToken', (token: any) => {
  setHeader('Authorization', `Bearer ${token}`);
});
