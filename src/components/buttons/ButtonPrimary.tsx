import React, {DetailedHTMLProps, HTMLAttributes} from 'react';

/* eslint-disable react/require-default-props */
interface ButtonPrimaryProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isSubmit?: boolean;
  image?: string;
  altImage?: string;
  text: string;
}

export const ButtonPrimary = ({isSubmit = false, image = '', altImage = '', text, ...props}: ButtonPrimaryProps) => {
  return (
    <button type={isSubmit ? 'submit' : 'button'} className="btn button-primary" {...props}>
      {image && <img src={image} alt={altImage} />}
      {text}
    </button>
  );
};
