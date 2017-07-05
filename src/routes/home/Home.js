import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import {
  PAGING_DEFAULT,
  // PAGING_MAX,
} from '../../constants';
import {
  changeUsername,
  loadPage,
} from './actions';
import { makeSelectUsername } from './selectors';
import s from './Home.css';

function totalPage(t) {
  return Math.ceil(t / PAGING_DEFAULT);
}

class Home extends React.Component {

  onClick = () => {
    this.props.onChangeUsername('Adele - Water Under the Bridge [Lyrics]');
  }

  onChangePage = (evt) => {
    evt.preventDefault();
    const { onChangePage, currentPage } = this.props;
    onChangePage(currentPage + 1);
  }

  render() {
    const { pageInfo, currentPage, username } = this.props;

    return (
      <div>
        <div className={s.newsListNav}>
          <Link className="disabled" to={`/?page=${currentPage - 1}`}>&lt; prev</Link>
          <span> {currentPage} / { totalPage(pageInfo.total) } </span>
          <Link to={`/?page=${currentPage + 1}`}>more &gt;</Link>
        </div>
        <div className={s.newsList}>
          { username }
          <button onClick={this.onClick}>Click here</button>
          <ul>
            {this.props.news.map(item => (
              <li key={item.link} className={s.newsItem}>
                <span className={s.score}>35</span>
                <span className="title">
                  <Link to={`news/${item._id}`} rel="noopener">
                    {item.title}
                  </Link>
                  <span className={s.host}> (zeptobars.com)</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    content: PropTypes.string,
  })).isRequired,
  pageInfo: PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: value => dispatch(changeUsername(value)),
    onChangePage: value => dispatch(loadPage(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Home));
// export default withStyles(s)(Home);
