import {AuthorizationStatus, logout} from "../../store/user/slice";
import {Link} from "react-router-dom";
import Routes from "../../routes";
import React, {memo, FC, SyntheticEvent} from "react";
import {RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";

const Header: FC = () => {
  const {authorizationStatus, authInfo: user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={Routes.MAIN}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  authorizationStatus === AuthorizationStatus.AUTH && (
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={Routes.FAVORITES}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={user?.avatarUrl} alt={user?.name}/>
                      </div>
                      <span className="header__user-name user__name">{user?.name}</span>
                    </Link>
                  )
                }
                {
                  authorizationStatus !== AuthorizationStatus.AUTH &&
                  (
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={Routes.LOGIN}
                    >
                      Sign in
                    </Link>
                  )
                }
              </li>
              <li className="header_nav-item">
                {
                  authorizationStatus === AuthorizationStatus.AUTH && (
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                      onClick={handleLogout}
                    >
                      <span className="header__user-name user__name">Logout</span>
                    </a>
                  )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
