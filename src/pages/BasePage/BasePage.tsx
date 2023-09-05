import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BasePageProps {
  children: React.ReactElement;
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <>
      <div className="container box-border overflow-auto p-8">{children}</div>
      <ToastContainer />
    </>
  );
}
