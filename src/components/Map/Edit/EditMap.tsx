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
import { RootState } from '../../../store/reducer';
import { createTileLayer } from '../../../utils/deck';

interface EditMapProps {
  mapStyle: string;
  viewState: object;
}

const EditMap: FC<EditMapProps> = ({ mapStyle, viewState }) => {
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
    onEdit: ({ updatedData }: any) => {
      setFeatures(updatedData);
    },
    getEditHandlePointColor: [0, 0, 0],
    editHandlePointRadiusMinPixels: 4,
    editHandlePointRadiusMaxPixels: 8,
    selectedFeatureIndexes,
  });

  useEffect(() => {
    console.log(features);
  }, [features]);

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
