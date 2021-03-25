import {AuthorizationStatus, logout} from "../../store/user/slice";
import {Link} from "react-router-dom";
import Routes from "../../routes";
import React, {FC, SyntheticEvent} from "react";
import {RootState} from "../../store";
import {connect} from "react-redux";
import AuthInfo from "../../models/auth-info";
import {ThunkDispatch} from "redux-thunk";

interface HeaderProps {
  authorizationStatus: AuthorizationStatus,
  user: AuthInfo,
  onLogout: () => void,
}

const Header: FC<HeaderProps>= (props) => {
  const {
    authorizationStatus,
    user,
    onLogout,
  } = props;

  const handleLogout = (event: SyntheticEvent) => {
    event.preventDefault();
    onLogout();
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  authorizationStatus === AuthorizationStatus.AUTH && (
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={user?.avatarUrl} alt={user?.name}/>
                      </div>
                      <span className="header__user-name user__name">{user?.name}</span>
                    </a>
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

const mapStateToProps = ({user}: RootState) => ({
  authorizationStatus: user.authorizationStatus,
  user: user.authInfo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  onLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
