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
import {
  makeSelectUsername,
  makeSelectPageInfo,
  makeSelectList,
} from './selectors';
import s from './Home.css';

function totalPage(t) {
  return Math.ceil(t / PAGING_DEFAULT);
}

class Home extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { currentPage, onChangePage } = this.props;
    if (currentPage !== nextProps.currentPage) {
      onChangePage(nextProps.currentPage);
    }
  }

  render() {
    const { pageInfo, currentPage, news } = this.props;
    const total = totalPage(pageInfo.get('total'));
    // if (currentPage < total) {

    // } else {

    // }
    return (
      <div>
        <div className={s.newsListNav}>
          {
            currentPage <= 1 ? <a className={s.linkDisable}>&lt; prev</a> :
            <Link to={`/?page=${currentPage - 1}`}>&lt; prev</Link>
          }
          <span> {currentPage} / { total } </span>
          {
            currentPage >= total ? <a className={s.linkDisable}>more &gt;</a> :
            <Link to={`/?page=${currentPage + 1}`}>more &gt;</Link>
          }
        </div>
        <div className={s.newsList}>
          <ul>
            {news.toJS().map(item => (
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
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   content: PropTypes.string,
  // })).isRequired,
  pageInfo: PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePage: value => dispatch(loadPage(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  pageInfo: makeSelectPageInfo(),
  news: makeSelectList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Home));
// export default withStyles(s)(Home);
