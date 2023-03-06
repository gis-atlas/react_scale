import DeckGL from '@deck.gl/react/typed';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { createLayer, createTileLayer } from '../../../utils/deck';

const DeckMap = ({ mapStyle, viewState }: any) => {
  const baseLayer = useMemo(() => createTileLayer(mapStyle), [mapStyle]);
  const [layers, setLayers] = useState<Array<any>>([baseLayer]);
  const [deckLayers, setDeckLayers] = useState<Array<any>>([]);

  const openedLayersData = useSelector(
    (state: RootState) => state.layer.openedLayers
  );

  const { view } = useSelector((state: RootState) => state.map);

  const renderLayers = async (layers: any) => {
    const data = await Promise.all(
      layers.map(async (layer: any) => {
        if (layer) {
          return await createLayer(layer.id, layer.type, layer.layer);
        }
      })
    );
    console.log('dataatatata', data);
    setDeckLayers(data);
  };

  useEffect(() => {
    if (openedLayersData.length) {
      renderLayers(openedLayersData);
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
    <DeckGL
      initialViewState={viewState}
      layers={layers}
      controller
      views={view}
    />
  );
};

export default DeckMap;
