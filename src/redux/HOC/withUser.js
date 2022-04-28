import { connect } from 'react-redux';
import { userSet } from '../actions';
import { DEFAULT_USER } from '../reducers';

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => {
    dispatch(userSet(data));
  },
});

const mapStateToProps = (state) => ({
  user: state.user ? state.user : DEFAULT_USER,
});

export default connect(mapStateToProps, mapDispatchToProps);
