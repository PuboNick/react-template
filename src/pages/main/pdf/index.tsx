import React, { useEffect, useRef, useState } from 'react';

import icon from '@/assets/icons/cashFlow.png';
import { getPdfJs, html2image } from '@/plugins/pdf';
import { downloadFile } from '@/plugins/file';
import constants from '@/plugins/constants';

export default function PdfPage() {
  const ref: any = useRef();
  const contentRef: any = useRef();
  const url = constants.BASE_URL + 'document.pdf';
  const [position, setPosition] = useState({ x: 80, y: 80 });

  const iconOffset = 40;
  const offsetX = (window.document.body.clientWidth - 597) / 2 + iconOffset;

  const onPageRendered = () => {
    console.log('done');
  };

  const onGetPage = (page: any) => {
    let scale = 1;
    let viewport = page.getViewport({ scale });
    let canvas: any = ref.current;
    let context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    let renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    page.render(renderContext).promise.then(onPageRendered);
  };

  const onGetPdf = (pdf: any) => {
    console.log(pdf.numPages);
    pdf.getPage(1).then(onGetPage);
  };

  const onGetPdfJs = (pdfjsLib: any) => {
    let loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(onGetPdf);
  };

  const onDragEnd = (e: any) => {
    let { pageX, pageY } = e;
    setPosition({ x: pageX - offsetX, y: pageY - iconOffset - 45 });
  };

  const save = () => {
    html2image(contentRef.current).then((res: any) =>
      downloadFile(res, 'test.png'),
    );
  };

  useEffect(() => {
    getPdfJs().then(onGetPdfJs);
  }, []);
  return (
    <div
      style={{
        paddingTop: '45px',
        width: '100%',
        height: '100vh',
        background: '#3f3f3f',
      }}
    >
      <div
        style={{
          width: '597px',
          margin: '0 auto',
          background: '#fff',
        }}
      >
        <div ref={contentRef}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex: 10000000,
              }}
            >
              <img src={icon} draggable onDragEnd={onDragEnd} />
            </div>
            <canvas ref={ref}></canvas>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: 'right',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          background: '#4a4a4a',
          padding: '5px 0',
        }}
      >
        <button onClick={() => save()} style={{ marginRight: '20px' }}>
          保存
        </button>
      </div>
    </div>
  );
}
