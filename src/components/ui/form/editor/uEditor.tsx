import React, { FC, useEffect, useRef, useState } from 'react';
import { getUe, EditorOptions } from '@/plugins/editor';

interface EditorProps {
  defaultValue?: any;
  ready?: any;
}

const Editor: FC<EditorProps> = ({ defaultValue, ready }) => {
  const ref: any = useRef();
  let [instance, setInstance]: any = useState(null);

  const onUeReady = (ue: any) => {
    if (defaultValue) ue.setContent(defaultValue);
    if (typeof ready === 'function') ready(ue);
  };

  const initEditor = (UE: any) => {
    if (instance) instance.destroy();
    let ue: any = UE.getEditor(ref.current, EditorOptions);
    ue.ready(() => onUeReady(ue));
    setInstance(ue);
  };

  useEffect(() => {
    getUe().then(initEditor);
    return () => {
      if (instance) instance.destroy();
    };
  }, []);
  return <div ref={ref} style={{ width: '100%', height: '100%' }}></div>;
};

export default Editor;
