import { useAccess } from '@/components/hooks/userHooks';
import React from 'react';

interface AccessContentProps {
  access: string;
  children: any;
}

const AccessContent = ({ children, access }: AccessContentProps) => {
  const accessObj: any = useAccess();

  if (!accessObj[access]) {
    return null;
  }

  return <>{children}</>;
};

export default AccessContent;
