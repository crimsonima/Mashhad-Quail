import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiMiniTableCells,
  HiOutlineUsers,
  HiShoppingBag,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    border-bottom: solid 0.5px var(--color-grey-0);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 4s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-red-800);
    border-bottom: solid 0.5px var(--color-red-800);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-red-800);
  }
`;

function MainNav() {
  const { isAuthenticated } = useUser();

  return (
    <nav>
      <NavList>
        {isAuthenticated ? (
          <li>
            <StyledNavLink to="/orders">
              <HiOutlineCalendarDays />
              <span>سفارش‌ها</span>
            </StyledNavLink>
          </li>
        ) : null}
        <li>
          <StyledNavLink to="/ordering">
            <HiShoppingBag />
            <span>ثبت سفارش</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/order/search">
            <HiMagnifyingGlass />
            <span>پیگیری </span>
          </StyledNavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <StyledNavLink to="/products">
              <HiMiniTableCells />
              <span>محصولات</span>
            </StyledNavLink>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <StyledNavLink to="/users">
              <HiOutlineUsers />
              <span>افزودن کاربر</span>
            </StyledNavLink>
          </li>
        ) : null}
      </NavList>
    </nav>
  );
}

export default MainNav;
