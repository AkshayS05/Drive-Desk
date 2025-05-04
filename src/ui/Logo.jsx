import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;
const Logo = () => {
  return (
    <StyledLogo>
      <Img src="/drive_desk.png" alt="logo" />
    </StyledLogo>
  );
};

export default Logo;
