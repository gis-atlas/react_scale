import { DeckGL } from '@deck.gl/react/typed';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { createTileLayer } from '../../../utils/deck';

const DeckMap = () => {
  const {
    layers: { baseTile },
    config: { controller, view, viewState },
  } = useSelector((state: RootState) => state.newMap) as any;

  const baseLayer = useMemo(
    () => createTileLayer(baseTile.layer, view.shortName),
    [baseTile.layer, view.shortName]
  );

  const [layers, setLayers] = useState<any>([baseLayer]);

  useEffect(() => {
    setLayers([baseLayer]);
  }, [baseLayer]);

  return (
    <DeckGL
      layers={layers}
      initialViewState={viewState}
      controller={controller}
      views={view.mode}
    />
  );
};

export default DeckMap;
