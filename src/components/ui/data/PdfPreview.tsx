import React, { FC } from 'react';

interface PdfPreviewProps {
  children: any;
  content: any;
}

const PdfPreview: FC<PdfPreviewProps> = ({ children, content }) => {
  return (
    <div style={{ ...styles.parent }}>
      <div style={{ ...styles.content }} ref={content}>
        {children}
      </div>
    </div>
  );
};

export default PdfPreview;

const styles: any = {
  parent: {
    position: 'fixed',
    top: 0,
    zIndex: -1,
    width: '100%',
    overflow: 'hidden',
    visibility: 'hidden',
  },
  content: {
    width: '872px',
    fontSize: '14px',
    fontFamily: 'sans-serif',
  },
};
