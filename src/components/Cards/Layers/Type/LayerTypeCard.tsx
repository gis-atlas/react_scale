import classNames from 'classnames';
import './index.sass';

interface ILayerTypeCard {
  icon: string;
  name: string;
  selected: boolean;
  title: string;
  setSelected: (name: string) => void;
}

const LayerTypeCard = ({
  icon,
  name,
  title,
  selected,
  setSelected = () => {},
}: ILayerTypeCard) => {
  return (
    <div
      className={classNames('layer-type-card', {
        selected,
      })}
      onClick={() => setSelected(name)}
    >
      <img src={icon} alt=' ' />
      <h6>{title}</h6>
    </div>
  );
};

export default LayerTypeCard;
