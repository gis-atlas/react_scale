import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import { useAppDispatch } from '../store';
import { getProject } from '../store/project';
import { getLayerGroups } from '../store/layer';
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

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getLayerGroups(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <div className='map'>
      <Menu title={project.name} layerGroups={layerGroups} />
    </div>
  );
};

export default Map;
