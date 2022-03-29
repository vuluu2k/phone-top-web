import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions } from 'actions';
import { selectAuth } from 'selectors';

function UserRouting({ children, ...rest }) {
  const {
    actions: { loadUser },
  } = rest;

  useEffect(
    () => loadUser(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <div>{children}</div>;
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(authActions, dispatch) });

export default connect(selectAuth, mapDispatchToProps)(UserRouting);
