import bootstrap from '../bootstrap';

bootstrap.on('mount', async () => {
  const loadingNode = document.getElementById('loading');
  if (!loadingNode) return;
  loadingNode.style.display = 'none';
});
