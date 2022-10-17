import React from 'react';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = styled.input`
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 14px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  width: 400px;
  outline: none;

  margin: 12px 0;
  ::placeholder {
    opacity: 0.4;
  }
`;

const Search: React.FC<InputProps> = ({ ...props }) => {
  return <SearchInput placeholder='Search...' {...props} />;
};

export default Search;
