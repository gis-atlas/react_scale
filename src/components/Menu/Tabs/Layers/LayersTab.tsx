import LayerCard from '../../../Cards/Layers/LayerCard';
import Button from '../../../UI/Button/Button';

const LayersTab = () => {
  return (
    <div className='tab tab-layers'>
      <div className='d-flex jc-sb ai-c'>
        <h4>Добавить новый слой</h4>
        <Button color='secondary' variant='circle' size='small'>
          <img src='/images/icons/plus.svg' alt='' />
        </Button>
      </div>
      <div className='tab-list-outer'>
        <ul className='tab-list'>
          {['demos', '3d', 'demos', 'relief', '3d', 'relief'].map((i: any) => (
            <LayerCard title={i} layerType={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LayersTab;
