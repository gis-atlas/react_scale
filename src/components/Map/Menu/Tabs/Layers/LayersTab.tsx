import LayerCard from '../../../../Cards/Layers/LayerCard';
import LayerGroupCard from '../../../../Cards/Layers/LayerGroupCard';
import Button from '../../../../UI/Button/Button';

interface ILayerCard {
  layerGroups?: Array<any>;
}

const LayersTab = ({ layerGroups = [] }: ILayerCard) => {
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
            layerGroup.type === 'USER' || layerGroup.type === 'ROOT' || layerGroup.layers.length !== 0 ? (
              <LayerGroupCard key={layerGroup.id} layers={layerGroup.layers} />
            ) : (
              <LayerCard
                key={layerGroup.id}
                id={layerGroup.id}
                name={layerGroup.name}
                layerIconType='relief'
                layerType={layerGroup.layerType}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default LayersTab;
