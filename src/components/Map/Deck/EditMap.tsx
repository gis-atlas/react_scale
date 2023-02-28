import DeckGL from '@deck.gl/react/typed';
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  EditableGeoJsonLayer,
} from 'nebula.gl';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { createTileLayer } from '../../../utils/deck';

const EditMap = ({ mapStyle, viewState }: any) => {
  const baseLayer = useMemo(() => createTileLayer(mapStyle), [mapStyle]);

  const [features, setFeatures] = useState<any>({
    type: 'FeatureCollection',
    features: [],
  });

  const [selectedFeatureIndexes] = useState<any>([]);

  const drawMode = useSelector((state: RootState) => state.map.drawMode);

  const editableLayer: any = new EditableGeoJsonLayer({
    id: 'editable-layer',
    data: features,
    mode:
      drawMode === 'drawPolygon'
        ? DrawPolygonMode
        : drawMode === 'drawPoint'
        ? DrawPointMode
        : drawMode === 'drawLine' && DrawLineStringMode,
    onEdit: ({ updatedData }: any) => {
      setFeatures(updatedData);
    },
    getEditHandlePointColor: [0, 0, 0],
    editHandlePointRadiusMinPixels: 4,
    editHandlePointRadiusMaxPixels: 8,
    selectedFeatureIndexes,
  });

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[baseLayer, editableLayer]}
      controller={{ doubleClickZoom: false }}
      getTooltip={({ object }) =>
        object &&
        `coordinates: ${JSON.stringify(object.geometry.coordinates, null, 2)}`
      }
    />
  );
};

export default EditMap;
