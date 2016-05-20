'use strict';

const user = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.user || null;
    case 'SIGN_OUT':
      return null;
    default:
      return state
  }
};


export default user;