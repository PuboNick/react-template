import React, { FC } from 'react';

import styles from './PdfPreviewStyle.less';

interface PdfPreviewProps {
  children: any;
  content: any;
}

/**
 * PDF 預覽組件，用於生成統一格式 PDF 文件
 */
const PdfPreview: FC<PdfPreviewProps> = ({ children, content }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.content} ref={content}>
        {children}
      </div>
    </div>
  );
};

export default PdfPreview;
