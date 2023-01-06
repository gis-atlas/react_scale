import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import { useAppDispatch } from '../store';
import { getProject } from '../store/project';
import { IProject } from '../store/project/type';
import { RootState } from '../store/reducer';

const Map = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project: IProject = useSelector(
    (state: RootState) => state.project.project
  );

  useEffect(() => {
    dispatch(getProject(Number(projectId)));
  }, [projectId, dispatch]);

  return (
    <div className='map'>
      <Menu title={project.name} />
    </div>
  );
};

export default Map;
