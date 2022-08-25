import React from 'react';

/* eslint-disable react/require-default-props */
type ButtonPrimaryProps = {
  image?: string;
  altImage?: string;
  text: string;
};

export const ButtonPrimary = ({image = '', altImage = '', text}: ButtonPrimaryProps) => {
  return (
    <button type="button" className="btn button-primary">
      {image && <img src={image} alt={altImage} />}
      {text}
    </button>
  );
};
