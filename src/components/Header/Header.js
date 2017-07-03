import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  render() {
    return (
      <header className={s.header}>
        <nav className={s.inner}>
          <Link to="/">
            <img className={s.logo} src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="24" height="24" alt="React" />
          </Link>
          <a href="/news" className="router-link-exact-active router-link-active">News</a>
          <a href="/" target="_blank" rel="noopener" className={s.github}>
            Built with ReactJS
          </a>
        </nav>
      </header>
    );
  }
}

export default withStyles(s)(Header);
