import React, { useEffect, useRef, useState } from 'react';

import icon from '@/assets/icons/cashFlow.png';
import { getPdfJs, html2image } from '@/plugins/pdf';
import { getItemsFormObj, downloadFile } from '@/plugins/utils';

export default function PdfPage() {
  const ref: any = useRef();
  const contentRef: any = useRef();
  const url = '/document.pdf';
  const [position, setPosition] = useState({ x: 80, y: 80 });

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
    let res = getItemsFormObj(e, ['pageX', 'pageY']);
    console.log(res);
    setPosition({ x: e.pageX - 40, y: e.pageY - 40 });
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
    <div>
      <div style={{ width: '800px' }}>
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
      <button onClick={() => save()}>保存</button>
    </div>
  );
}
