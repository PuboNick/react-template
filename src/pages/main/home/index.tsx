import React, { FC } from 'react';
import { IndexModelState, useSelector } from 'umi';
import PdfEmbed from '@/components/ui/data/pdf/embed/PdfEmbed';

const IndexPage: FC = () => {
  const index: IndexModelState = useSelector((state: any) => state.index);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PdfEmbed url={index.pdfUrl} />
    </div>
  );
};

export default IndexPage;
