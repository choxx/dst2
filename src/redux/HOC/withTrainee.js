import { connect } from 'react-redux';
import { traineeSet } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  setTrainee: (data) => {
    dispatch(traineeSet(data));
  },
});

const mapStateToProps = (state) => ({
  trainee: state.trainee ? state.trainee : {},
});

export default connect(mapStateToProps, mapDispatchToProps);
