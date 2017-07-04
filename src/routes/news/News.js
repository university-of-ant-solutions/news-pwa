import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './News.css';

class News extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      content: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={s.newsListNav}>
          <a className="disabled">&lt; prev</a>
          <span>1/25</span>
          <a href="/top/2">more &gt;</a>
        </div>
        <div className={s.root}>
          <div className={s.container}>
            <article key={data.link} className={s.newsItem}>
              <h1 className={s.newsTitle}><a href={data.link}>{data.title}</a></h1>
              <div
                className={s.newsDesc}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(News);
