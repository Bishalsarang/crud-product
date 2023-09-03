import React from 'react';

interface BasePageProps {
  children: React.ReactElement;
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <div className="container box-border overflow-auto p-8">{children}</div>
  );
}
