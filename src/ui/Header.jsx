import { styled } from "styled-components";
import CartOverview from "../features/Ordering/CartOverview";
import { NavLink } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 2px solid var(--color-grey-100);
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-600);
    border-bottom: solid 0.5px var(--color-grey-0);
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-red-800);
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-red-800);
  }
`;
const StyledSpan = styled.span`
  display: flex;
  gap: 2.4rem;
`;

function Header() {
  const { isAuthenticated } = useUser();
  return (
    <div>
      <StyledHeader>
        <StyledSpan>
          {isAuthenticated ? (
            <>
              <UserAvatar />
              <HeaderMenu />
            </>
          ) : (
            <StyledNavLink to="/login">login</StyledNavLink>
          )}
        </StyledSpan>
        <CartOverview />
      </StyledHeader>
    </div>
  );
}

export default Header;
