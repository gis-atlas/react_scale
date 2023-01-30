import DeckGL from '@deck.gl/react/typed';
import { createTileLayer, createLayer } from '../../../utils/deck';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { useEffect, useMemo, useState } from 'react';

const DeckMap = ({ mapStyle, viewState }: any) => {
  const baseLayer = useMemo(() => createTileLayer(mapStyle), [mapStyle]);
  const [layers, setLayers] = useState<Array<any>>([baseLayer]);
  const [deckLayers, setDeckLayers] = useState<Array<any>>([]);

  const openedLayersData = useSelector(
    (state: RootState) => state.layer.openedLayers
  );

  useEffect(() => {
    if (openedLayersData.length) {
      const data = openedLayersData.map((openedLayerData: any) => {
        if (openedLayerData) {
          return createLayer(
            openedLayerData.id,
            openedLayerData.type,
            openedLayerData.layer
          );
        }
      });
      console.log('dataatatata', data);
      setDeckLayers(data);
    } else {
      setDeckLayers([]);
    }
  }, [openedLayersData]);

  useEffect(() => {
    if (deckLayers.length !== 0) {
      setLayers([baseLayer, deckLayers]);
    } else {
      setLayers([baseLayer]);
    }
  }, [mapStyle, deckLayers, baseLayer]);

  return <DeckGL initialViewState={viewState} layers={layers} controller />;
};

export default DeckMap;
