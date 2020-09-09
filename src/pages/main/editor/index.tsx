import React, { useState } from 'react';

import Editor from '@/components/ui/form/Editor';

export default function EditorPage() {
  const [ue, setUe]: any = useState(null);

  return (
    <div style={{ height: '400px', width: '800px', margin: '0 auto' }}>
      <Editor ready={(instance: any) => setUe(instance)} />
      <button onClick={() => console.log(ue.getContent())}>獲取內容</button>
    </div>
  );
}
