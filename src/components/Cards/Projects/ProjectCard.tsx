import classNames from 'classnames';
import Button from '../../UI/Button/Button';
import './index.sass';

interface IProjectCard {
  isMyProject?: boolean;
  title?: string;
  lastUpdated?: string;
  view?: number;
}

const ProjectCard = ({
  isMyProject,
  view = 1,
  title,
  lastUpdated,
}: IProjectCard) => {
  return (
    <div
      className={classNames('project-card', {
        [`view-${view}`]: view,
      })}
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
          {lastUpdated && (
            <p>
              Последние изменения
              <br />
              {lastUpdated}
            </p>
          )}
        </div>
      </div>
      <div className='redirect-to-map'>
        <Button color='secondary'>Перейти на карту</Button>
      </div>
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
      {isMyProject ? 'Мой проект' : 'Гостевой проект'}
    </div>
  );
};

export default ProjectCard;
