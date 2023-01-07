import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MapMenu from '../components/Map/Menu/MapMenu';
import { useAppDispatch } from '../store';
import { getProject } from '../store/project';
import { getLayerGroups } from '../store/layer';
import { IProject } from '../store/project/type';
import { RootState } from '../store/reducer';
import MapControls from '../components/Map/Controls/MapControls';
import DeckMap from '../components/Map/Map/DeckMap';

const Map = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project: IProject = useSelector(
    (state: RootState) => state.project.project
  );
  const layerGroups: any = useSelector(
    (state: RootState) => state.layer.layerGroups
  );

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getLayerGroups(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <div className='map'>
      <MapMenu title={project.name} layerGroups={layerGroups} />
      <MapControls />
      <DeckMap />
    </div>
  );
};

export default Map;
