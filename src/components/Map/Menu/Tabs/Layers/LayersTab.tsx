import LayerCard from '../../../../Cards/Layers/LayerCard';
import LayerGroupCard from '../../../../Cards/Layers/LayerGroupCard';
import Button from '../../../../UI/Button/Button';

interface ILayerCard {
  layerGroups: Array<any>;
}

const LayersTab = ({ layerGroups }: ILayerCard) => {
  console.log(layerGroups);
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
          {layerGroups?.map((layerGroup) =>
            layerGroup.name === 'group' || layerGroup.layers.length !== 0 ? (
              <LayerGroupCard layers={layerGroup.layers} />
            ) : (
              <LayerCard
                key={layerGroup.id}
                name={layerGroup.name}
                layerType='relief'
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default LayersTab;
