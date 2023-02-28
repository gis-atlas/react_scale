import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MapControls from '../components/Map/Controls/MapControls';
import DeckMap from '../components/Map/Deck/DeckMap';
import EditDeckMap from '../components/Map/Deck/EditMap';
import EditMapMenu from '../components/Map/Menu/Edit/EditMapMenu';
import MapMenu from '../components/Map/Menu/MapMenu';
import { useAppDispatch } from '../store';
import { loadLayerGroups } from '../store/layer';
import { getProject } from '../store/project';
import { IProject } from '../store/project/type';
import { RootState } from '../store/reducer';

const Map = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project: IProject = useSelector(
    (state: RootState) => state.project.project
  );
  const layerGroups: any = useSelector(
    (state: RootState) => state.layer.layerGroups
  );

  const { baseLayer, viewState, mode }: any = useSelector(
    (state: RootState) => state.map
  );

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
    dispatch(loadLayerGroups(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <div className='map'>
      {mode === 'editing' ? (
        <>
          <EditMapMenu />
          <EditDeckMap mapStyle={baseLayer.layer} viewState={viewState} />
        </>
      ) : (
        <>
          <MapMenu
            projectId={projectId}
            title={project.name}
            layerGroups={layerGroups}
          />
          <DeckMap mapStyle={baseLayer.layer} viewState={viewState} />
        </>
      )}
      <MapControls />
    </div>
  );
};

export default Map;
