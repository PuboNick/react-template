import React, { useRef, useState } from 'react';

interface FileReaderProps {
  children: any;
  btnClassName?: any;
  onClick?: any;
  onChooseFile?: any;
}

export default function FileReader({
  children,
  btnClassName,
  onClick,
  onChooseFile,
}: FileReaderProps) {
  const ref: any = useRef();
  const [state, setState] = useState(false);
  const onBtnClick = () => {
    setState(false);
    ref.current.value = null;
    setState(true);
    ref.current.click();
    if (typeof onClick === 'function') onClick(ref.current);
  };
  const onChange = (e: any) => {
    if (typeof onChooseFile === 'function' && state)
      onChooseFile(e.target.files);
  };
  return (
    <>
      <button onClick={() => onBtnClick()} className={btnClassName}>
        {children}
      </button>
      <input
        type="file"
        onChange={onChange}
        ref={ref}
        style={{ visibility: 'hidden', width: 0, height: '30px' }}
      />
    </>
  );
}
