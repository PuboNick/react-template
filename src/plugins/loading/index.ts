import bootstrap from '../bootstrap';

bootstrap.on('mount', async () => {
  const loadingNode = document.getElementById('loading');
  if (!loadingNode) return;
  loadingNode.style.display = 'none';
});

// 設置全局 Loading 的狀態
export const setLoading = (loading: boolean) => {
  const loadingNode = document.getElementById('loading');
  if (!loadingNode) return;
  if (loading) {
    loadingNode.style.display = 'block';
  } else {
    loadingNode.style.display = 'none';
  }
};

// 創建全局loading的工廠方法
export const createLoadingFactory = (callback: (...args: any) => any) => {
  return async (...args: any) => {
    setLoading(true);
    await callback(...args);
    setLoading(false);
  };
};
