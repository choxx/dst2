import { connect } from 'react-redux';
import { phoneSet } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setPhone: (data) => {
    dispatch(phoneSet(data));
  },
});

const mapStateToProps = (state) => ({
  phone: state.phone ? state.phone : null,
});

export default connect(mapStateToProps, mapDispatchToProps);
