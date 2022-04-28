import { connect } from 'react-redux';
import { notifySet } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setNotify: (data) => {
    dispatch(notifySet(data));
  },
});

const mapStateToProps = (state) => ({
  notify: state.notify ? state.notify : null,
});

export default connect(mapStateToProps, mapDispatchToProps);
