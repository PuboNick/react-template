import React, { useState, FC, useEffect } from 'react';

interface HorizontalScreenProps {
  children: any;
  offsetHeight?: number;
  containerStyle?: any;
}

const change2Height = () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  let app: any = document.getElementById('root');
  app.style.position = 'absolute';
  app.style.width = height + 'px';
  app.style.height = width + 'px';
  app.style.top = (height - width) / 2 + 'px';
  app.style.left = 0 - (height - width) / 2 + 'px';
  app.style.transform = 'rotate(90deg)';
  app.style.transformOrigin = '50% 50%';
};

const change2Width = () => {
  let app: any = document.getElementById('root');
  app.style.removeProperty('position');
  app.style.removeProperty('width');
  app.style.removeProperty('height');
  app.style.removeProperty('top');
  app.style.removeProperty('left');
  app.style.removeProperty('transform');
  app.style.removeProperty('transformOrigin');
};

const onSizeChange = () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  if (width < height) {
    change2Height();
    return width;
  } else {
    change2Width();
    return height;
  }
};

/**
 * 自動橫屏顯示
 */
const HorizontalScreen: FC<HorizontalScreenProps> = ({
  children,
  offsetHeight = 0,
  containerStyle = {},
}) => {
  const [height, setHeight] = useState(onSizeChange());

  const setContainer = () => {
    setHeight(onSizeChange());
  };

  useEffect(() => {
    window.addEventListener('resize', setContainer);
    return () => {
      window.removeEventListener('resize', setContainer);
      change2Width();
    };
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: height - offsetHeight,
        overflow: 'auto',
        ...containerStyle,
      }}
    >
      {children}
    </div>
  );
};

export default HorizontalScreen;
