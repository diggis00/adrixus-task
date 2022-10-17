import { EyeSlash } from 'assets';
import React from 'react';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputGroup = styled.div`
  margin: 10px 0px;
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  color: #707070;
  margin-bottom: 6px;
`;

const CustomInput = styled.input`
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 20px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  outline: none;

  ::placeholder {
    opacity: 0.4;
  }
`;

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <CustomInput {...props} />
      <span>
        <img src={EyeSlash} style={{ width: 40 }} />
      </span>
    </InputGroup>
  );
};

export default Input;
