import React from 'react';
import { useModel } from 'umi';

interface MainLayoutProps {
  children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { initialState } = useModel('@@initialState');
  console.log(initialState);
  return <div>{children}</div>;
}
