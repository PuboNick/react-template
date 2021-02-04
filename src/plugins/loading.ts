import { sleep } from './utils/index';
import bootstrap from './bootstrap';

bootstrap.on('mount', async () => {
  const loadingNode = document.getElementById('loading');
  if (!loadingNode) return;
  loadingNode.style.background = 'rgba(255, 255, 255, 0)';
  await sleep(1000);
  loadingNode.style.display = 'none';
});
