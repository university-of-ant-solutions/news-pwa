import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      content: PropTypes.string,
    })).isRequired,
  };

  render() {
    return (
      <div className={s.newsList}>
        <ul>
          {this.props.news.map(item => (
            <li key={item.link} className={s.newsItem}>
              <span className={s.score}>35</span>
              <span className="title">
                <Link to={`news/${item._id}`} target="_blank" rel="noopener">
                  {item.title}
                </Link>
                <span className={s.host}> (zeptobars.com)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Home);
