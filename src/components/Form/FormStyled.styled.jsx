import styled from '@emotion/styled';
import { Form, ErrorMessage, Field } from 'formik';

export const FormSlyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledInput = styled(Field)`
  display: flex;
  width: 250px;
`;

export const ErrMessage = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
  max-width: 200px;
`;

export const Label = styled.label`
  color: #2a6b84;
  font-weight: 700;
`;

export const Button = styled.button`
  max-width: 80px;
  background-color: #2a6b84;
  color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #458199;
  }
`;
