import React, { Children } from 'react';
import { withRouter } from 'react-router'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default withRouter(ScrollToTop)