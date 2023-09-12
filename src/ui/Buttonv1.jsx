import { styled } from "styled-components";

const Buttonv1 = styled.button`
  display: inline-block;
  color: back;
  background-color: white;
  border-color: var(--color-red-400);
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.025em;
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 10px;
  &:hover {
    background-color: var(--color-red-800);

    color: white;
  }
`;

export default Buttonv1;
