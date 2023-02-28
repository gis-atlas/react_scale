import DeckGL from '@deck.gl/react/typed';
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
  ViewMode,
} from 'nebula.gl';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { setDataset } from '../../../store/map';
import { RootState } from '../../../store/reducer';
import { createTileLayer } from '../../../utils/deck';

interface EditMapProps {
  mapStyle: string;
  viewState: object;
}

const EditMap: FC<EditMapProps> = ({ mapStyle, viewState }) => {
  const dispatch = useAppDispatch();
  const baseLayer = useMemo(() => createTileLayer(mapStyle), [mapStyle]);
  const [selectedFeatureIndexes] = useState<any>([]);
  const [features, setFeatures] = useState<any>({
    type: 'FeatureCollection',
    features: [],
  });

  const drawMode = useSelector((state: RootState) => state.map.drawMode);

  const editableLayer: any = new EditableGeoJsonLayer({
    id: 'editable-layer',
    data: features,
    mode:
      drawMode === 'drawPolygon'
        ? DrawPolygonMode
        : drawMode === 'drawPoint'
        ? DrawPointMode
        : drawMode === 'drawLine'
        ? DrawLineStringMode
        : ViewMode,
    onEdit: ({ updatedData }) => {
      setFeatures(updatedData);
    },
    onClick: ({ index }) => {
      console.log(index);
    },
    getTentativeFillColor: [0, 0, 0, 0.7 * 255],
    getLineColor: [100, 100, 200],
    getFillColor: [100, 100, 140, 0.7 * 255],
    getEditHandlePointColor: [0, 0, 0],
    editHandlePointRadiusMinPixels: 4,
    editHandlePointRadiusMaxPixels: 8,
    selectedFeatureIndexes,
  });

  useEffect(() => {
    dispatch(setDataset(features));
  }, [dispatch, features]);

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[baseLayer, editableLayer]}
      controller={{ doubleClickZoom: false }}
      getTooltip={({ object, color }) =>
        object && `coordinates: ${JSON.stringify(color, null, 2)}`
      }
    />
  );
};

export default EditMap;
