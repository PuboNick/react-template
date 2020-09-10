import React, { useState, FC, useEffect } from 'react';

interface HorizontalScreenProps {
  children: any;
  offsetHeight?: number;
}

const onSizeChange = () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  let app: any = document.getElementById('root');
  if (width < height) {
    app.style.position = 'absolute';
    app.style.width = height + 'px';
    app.style.height = width + 'px';
    app.style.top = (height - width) / 2 + 'px';
    app.style.left = 0 - (height - width) / 2 + 'px';
    app.style.transform = 'rotate(90deg)';
    app.style.transformOrigin = '50% 50%';
    return width;
  } else {
    app.style.position = 'absolute';
    app.style.width = width + 'px';
    app.style.height = height + 'px';
    app.style.top = '0px';
    app.style.left = '0px';
    app.style.transform = 'none';
    app.style.transformOrigin = '50% 50%';
    return height;
  }
};

const HorizontalScreen: FC<HorizontalScreenProps> = ({
  children,
  offsetHeight = 0,
}) => {
  const [height, setHeight] = useState(onSizeChange());

  const setContainer = () => {
    setHeight(onSizeChange());
  };

  useEffect(() => {
    window.addEventListener('resize', setContainer);
    return () => {
      window.removeEventListener('resize', setContainer);
    };
  }, []);
  return (
    <div
      className="market-box"
      style={{ width: '100%', height: height - offsetHeight }}
    >
      {children}
    </div>
  );
};

export default HorizontalScreen;
