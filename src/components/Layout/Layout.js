import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Header />
        <div className={cx(s.newsView, s.view)}>
          <div className={s.newsListNav}>
            <a className="disabled">&lt; prev</a>
            <span>1/25</span>
            <a href="/top/2">more &gt;</a>
          </div>
          {this.props.children}
          <Feedback />
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
