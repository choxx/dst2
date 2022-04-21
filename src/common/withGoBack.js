import { connect } from 'react-redux';
import { goBackSet } from '../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  setGoBack: (data) => {
    dispatch(goBackSet(data));
  },
});

const mapStateToProps = (state) => ({
  goBack: state.goBack ? state.goBack : [],
});

export default connect(mapStateToProps, mapDispatchToProps);
