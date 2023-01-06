import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import './index.sass';

interface IProjectCard {
  isMyProject?: boolean;
  title?: string;
  lastUpdated?: string;
  view?: number;
  project?: Array<object>;
  id: number;
}

const ProjectCard = ({
  isMyProject,
  view = 1,
  title,
  lastUpdated,
  project,
  id,
}: IProjectCard) => {
  const navigate = useNavigate();

  const goToMap = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/map/${id}`);
  };
  // TODO: заменить на переход на страницу проекта
  const goToProject = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div
      className={classNames('project-card', {
        [`view-${view}`]: view,
        'user-background': view === 2 && isMyProject,
        'guest-background': view === 2 && !isMyProject,
      })}
      onClick={view === 1 ? goToProject : () => {}}
    >
      {view === 1 && <Badge isMyProject={isMyProject} />}
      <div
        className={classNames('project-card-inner', {
          [`view-${view}`]: view,
        })}
      >
        {view === 1 && (
          <div
            className={classNames('project-card-image', {
              'user-background': isMyProject,
              'guest-background': !isMyProject,
            })}
          ></div>
        )}
        <div
          className={classNames('project-card-info', {
            [`view-${view}`]: view,
          })}
        >
          <h4>{title}</h4>
          {lastUpdated && view === 1 && (
            <p>
              Последние изменения
              <br />
              {lastUpdated}
            </p>
          )}
          {view === 2 && (
            <Button
              size='small'
              color='secondary d-flex'
              styles={{ gap: '3px', alignSelf: 'end' }}
              onClick={goToProject}
            >
              Перейти
              <img src='/images/icons/arrow.svg' alt='' />
            </Button>
          )}
        </div>
      </div>
      {view === 1 && (
        <div className='redirect-to-map'>
          <Button
            color='secondary d-flex'
            styles={{ gap: '8px' }}
            onClick={goToMap}
          >
            Перейти на карту
            <img src='/images/icons/map.svg' alt='' />
          </Button>
        </div>
      )}
    </div>
  );
};

interface IBadge {
  isMyProject?: boolean;
}

const Badge = ({ isMyProject }: IBadge) => {
  return (
    <div
      className={classNames('badge', {
        user: isMyProject,
        guest: !isMyProject,
      })}
    >
      {isMyProject ? 'Мой проект' : 'Доступен для редактирования'}
    </div>
  );
};

export default ProjectCard;
