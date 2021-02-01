import Loading from '@/pages/common/loading';
import ErrorPage403 from '@/pages/error/403';
import React from 'react';
import { useModel } from 'umi';

interface MainLayoutProps {
  children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { initialState, loading } = useModel('@@initialState');

  if (loading) return <Loading />;

  if (!initialState?.isAuthority) return <ErrorPage403 />;

  return <div>{children}</div>;
}
