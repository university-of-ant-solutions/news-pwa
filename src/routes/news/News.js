import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../history';
import {
  makeSelectId,
  makeSelectData,
} from './selectors';
import {
  loadNew,
  clearData,
} from './actions';
import s from './News.css';

class News extends React.Component {

  onBack = (evt) => {
    evt.preventDefault();
    history.goBack();
  }

  componentDidMount = () => {
    const { onLoadNew, params, data } = this.props;
    if (!data || params.id !== data.get('_id')) {
      onLoadNew(params.id);
    }
  }

  componentWillUnmount = () => {
    const { onClearData } = this.props;
    onClearData();
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={s.newsListNav}>
          <span onClick={this.onBack}>Back</span>
        </div>
        <div className={s.root}>
          <div className={s.container}>
            {data && <article key={data.get('link')} className={s.newsItem}>
              <h1 className={s.newsTitle}><a href={data.get('link')}>{data.get('title')}</a></h1>
              <div
                className={s.newsDesc}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: data.get('content') }}
              />
            </article>}
          </div>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    content: PropTypes.string,
  }),
  onLoadNew: PropTypes.func.isRequired,
  onClearData: PropTypes.func.isRequired,
};
News.defaultProp = {
  data: null,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadNew: value => dispatch(loadNew(value)),
    onClearData: () => dispatch(clearData()),
  };
}

const mapStateToProps = createStructuredSelector({
  id: makeSelectId(),
  data: makeSelectData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(News));
