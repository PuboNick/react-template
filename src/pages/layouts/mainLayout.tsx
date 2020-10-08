import React from 'react';

interface MainLayoutProps {
  children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div>{children}</div>;
}
