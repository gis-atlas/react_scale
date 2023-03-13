import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ObjectCard from '../components/Cards/Dataset/ObjectCard';
import MapControls from '../components/Map/Controls/MapControls';
import EditMapMenu from '../components/Map/Edit/EditMapMenu';
import MapMenu from '../components/Map/Menu/MapMenu';
import DeckMap from '../components/Map/New/DeckMap';
import { useAppDispatch } from '../store';
import { loadLayerGroups } from '../store/layer';
import { getProject } from '../store/project';
import { IProject } from '../store/project/type';
import { RootState } from '../store/reducer';

const MapPage = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project: IProject = useSelector(
    (state: RootState) => state.project.project
  );
  const layerGroups: any = useSelector(
    (state: RootState) => state.layer.layerGroups
  );
  const { status } = useSelector((state: RootState) => state.map.mode);

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
    dispatch(loadLayerGroups(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <>
      {status === 'view' ? (
        <MapMenu
          projectId={projectId}
          layerGroups={layerGroups}
          title={project.name}
        />
      ) : (
        status === 'edit' && <EditMapMenu />
      )}
      <MapControls />
      <DeckMap />
      <ObjectCard id={1} title='Точка рекогносцировки 3' key={1} />
    </>
  );
};

export default MapPage;
