import React from 'react';

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

export const Alert = ({type, message}: AlertProps) => {
  return (
    <div aria-label="alert" className={`alert alert-${type}`}>
      {message}
    </div>
  );
};
