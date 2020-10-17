import React, { FC, useRef, useEffect } from 'react';
// @ts-ignore
import PdfObject from 'pdfobject';
import { getEmbedPdfUrl } from '@/plugins/pdf';
import constants from '@/plugins/constants';

interface PdfEmbedProps {
  url: string | null;
}

/**
 * pdfjs viewer 配置
 */
const options = {
  forcePDFJS: true,
  PDFJS_URL: constants.BASE_URL + 'pdfjs/web/viewer.html',
};

const PdfEmbed: FC<PdfEmbedProps> = ({ url }) => {
  const ref: any = useRef();
  useEffect(() => {
    if (url) PdfObject.embed(getEmbedPdfUrl(url), ref.current, options);
  }, [url]);
  return <div ref={ref} style={{ width: '100%', height: '100%' }}></div>;
};

export default PdfEmbed;
