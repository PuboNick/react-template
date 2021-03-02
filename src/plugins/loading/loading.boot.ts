import { setGlobalLoading } from '.';
import bootstrap from '@/system/bootstrap';

bootstrap.on('mount', async () => {
  setGlobalLoading(false);
});
