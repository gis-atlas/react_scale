import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { getProject } from '../store/project';
import { loadLayerGroups } from '../store/layer';
import { IProject } from '../store/project/type';
import { RootState } from '../store/reducer';
import MapMenu from '../components/Map/Menu/MapMenu';
import MapControls from '../components/Map/Controls/MapControls';
import DeckMap from '../components/Map/Deck/DeckMap';

const Map = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project: IProject = useSelector(
    (state: RootState) => state.project.project
  );
  const layerGroups: any = useSelector(
    (state: RootState) => state.layer.layerGroups
  );

  const { baseLayer, viewState }: any = useSelector(
    (state: RootState) => state.map
  );

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
    dispatch(loadLayerGroups(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <div className='map'>
      <MapMenu title={project.name} layerGroups={layerGroups} />
      <MapControls />
      <DeckMap mapStyle={baseLayer.layer} viewState={viewState} />
    </div>
  );
};

export default Map;
