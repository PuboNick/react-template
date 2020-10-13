import React, { FC } from 'react';
import { IndexModelState, ConnectProps, connect } from 'umi';

import PdfEmbed from '@/components/ui/data/pdf/embed/pdfEmbed';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const IndexPage: FC<PageProps> = ({ index }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PdfEmbed url={index.pdfUrl} />
    </div>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({
  index,
}))(IndexPage);
