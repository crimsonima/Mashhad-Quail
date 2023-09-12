import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  cursor: default;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/quail_ridge 1.gif" alt="Logo" />
      <h1>بلدرچین مشهد</h1>
    </StyledLogo>
  );
}

export default Logo;
