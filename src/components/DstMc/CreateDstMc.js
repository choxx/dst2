import { onGoBack } from '../../common/globals';
import withGoBack from '../../redux/HOC/withGoBack';
import Header from '../Header';

const CreateDstMc = ({ goBack }) => {
  const onBack = () => {
    onGoBack(goBack);
  };
  return (
    <div>
      <Header title="Create DST MC" onBackButton={onBack} />
      <div className="text-center text-teal-700">
        Coming soon...
      </div>
    </div>
  );
};
export default withGoBack(CreateDstMc);
