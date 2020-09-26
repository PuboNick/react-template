import React, { FC, useRef, useEffect, useState } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';

import PdfEmbed from '@/components/ui/data/PdfEmbed';
import PdfPreview from '@/components/ui/data/PdfPreview';
import { html2dataUrl } from '@/plugins/pdf';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = ({ index }) => {
  const ref: any = useRef();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    html2dataUrl(ref.current).then((dataUrl: any) => setUrl(dataUrl));
  }, [index]);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PdfPreview content={ref}>
        <div>test</div>
      </PdfPreview>
      <PdfEmbed url={url} />
    </div>
  );
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(IndexPage);
