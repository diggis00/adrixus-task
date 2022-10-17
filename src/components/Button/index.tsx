import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button`
  background-color: #000000;
  border: 2px solid #1a1a1a;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 24px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  :hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
  :disabled {
    pointer-events: none;
  }
`;

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <CustomButton {...props}>{props.children}</CustomButton>;
};

export default Button;
