import DeckGL from '@deck.gl/react/typed';
import { createTileLayer, createLayer } from '../../../utils/deck';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { useEffect, useMemo, useState } from 'react';

const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
};

const DeckMap = ({ mapStyle }: any) => {
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
          console.log('lafdsgd', openedLayerData.type);
          return createLayer(
            openedLayerData.id,
            openedLayerData.type,
            openedLayerData.layer
          );
        }
      });
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

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} layers={layers} controller />
  );
};

export default DeckMap;
