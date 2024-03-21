import styled from 'styled-components';

interface InputProps {
}

const StyledInput = styled.input<InputProps>`
  padding: 8px;
  border-radius: 4px;

  ${(props) => props.className === 'login' && `
     padding: 12px;
     border-radius: 8px;
     outline: none;
     
     border-color: transparent;
     margin-top: 7px;

     &:focus {
       border-color: transparent; 
       box-shadow: none; 
     }
  `}

  ${(props) => props.className === 'small' && `
    font-size: 12px;
    padding: 6px;
  `}
`;

export default StyledInput;
