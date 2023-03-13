import { DeckGL } from '@deck.gl/react/typed';
import { DrawPointMode, EditableGeoJsonLayer } from 'nebula.gl';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { setDataset } from '../../../store/map';
import { RootState } from '../../../store/reducer';
import { createTileLayer } from '../../../utils/deck';

const DeckMap = () => {
  const dispatch = useAppDispatch();

  const {
    mode: { status, mode },
    layers: { baseTile, opened },
    config: { controller, view, viewState },
  } = useSelector((state: RootState) => state.map);

  const baseLayer = useMemo(
    () => createTileLayer(baseTile.layer, view.shortName),
    [baseTile.layer, view.shortName]
  );
  const [selectedFeatureIndexes] = useState<any>([]);
  const [features, setFeatures] = useState<any>({
    type: 'FeatureCollection',
    features: [],
  });
  const [layers, setLayers] = useState<any>([baseLayer]);

  const [editableLayer, setEditableLayer] = useState<any>();

  useEffect(() => {
    const layer = new EditableGeoJsonLayer({
      id: 'editable-layer',
      data: features,
      mode: mode.mode,
      onEdit: ({ updatedData }) => {
        setFeatures(updatedData);
      },
      selectedFeatureIndexes,
    });
    console.log(layer);
    setEditableLayer(layer);
  }, [mode, features, selectedFeatureIndexes]);

  useEffect(() => {
    setLayers([baseLayer, opened]);
  }, [baseLayer, opened]);

  useEffect(() => {
    dispatch(setDataset(features));
  }, [dispatch, features]);

  useEffect(() => {
    console.log(viewState);
  }, [viewState]);

  useEffect(() => {
    if (status === 'edit') {
      setLayers((prev: any) => [baseLayer, editableLayer]);
    } else {
      setLayers((prev: any) =>
        prev.filter((layer: any) => layer.id !== 'editable-layer')
      );
    }
  }, [status, editableLayer, baseLayer]);

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
