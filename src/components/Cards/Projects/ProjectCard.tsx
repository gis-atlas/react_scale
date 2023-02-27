import classNames from 'classnames';
import { SyntheticEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { createProject } from '../../../store/project';
import Form from '../../Forms/Form';
import Modal from '../../Modal/Modal';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './index.sass';

interface IProjectCard {
  id: number;
  isMyProject?: boolean;
  title?: string;
  lastUpdated?: string;
  view?: number;
  project?: Array<object>;
  isNewProjectCard?: boolean;
}

const ProjectCard = ({
  isMyProject,
  view = 1,
  title,
  lastUpdated,
  project,
  isNewProjectCard = false,
  id,
}: IProjectCard) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isCreate, setCreate] = useState<boolean>(false);

  const goToMap = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/map/${id}`);
  };
  const goToProject = () => {
    navigate(`/projects/${id}`);
  };
  const onCreateProject = (form: HTMLFormElement) => {
    const {
      newProjectName: { value: name },
    } = form;
    if (!name.length) {
      return;
    }
    dispatch(createProject(name));
    setCreate(false);
  };

  return (
    <>
      <div
        className={classNames('project-card', {
          [`view-${view}`]: view,
          'user-background': view === 2 && isMyProject && !isNewProjectCard,
          'guest-background': view === 2 && !isMyProject && !isNewProjectCard,
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
            <h4
              style={
                isNewProjectCard
                  ? {
                      maxWidth: 'inherit',
                      textAlign: 'center',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }
                  : {}
              }
            >
              {isNewProjectCard ? 'Новый проект' : title}
            </h4>
            {lastUpdated && view === 1 && (
              <p>
                Последние изменения
                <br />
                {lastUpdated}
              </p>
            )}
            {view === 2 && !isNewProjectCard && (
              <Button
                size='small'
                color='secondary d-flex'
                styles={{ alignSelf: 'end' }}
                onClick={goToProject}
              >
                Перейти
                <img src='/images/icons/arrow.svg' alt='' />
              </Button>
            )}
            {view === 2 && isNewProjectCard && (
              <Button
                size='small'
                color='primary d-flex'
                styles={{ alignSelf: 'center', marginBottom: '7px' }}
                onClick={() => setCreate(true)}
              >
                Создать
                <img
                  src='/images/icons/plus.svg'
                  alt=''
                  style={{ width: '7px', height: '7px' }}
                />
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
      {view === 2 && isNewProjectCard && (
        <Modal state={isCreate} setState={setCreate}>
          <div className='d-flex js-sb f-column' style={{ gap: '20px' }}>
            <h2 style={{ paddingRight: '100px' }}>Создание проекта</h2>
            <Form submitHandler={onCreateProject}>
              <Input label='Название проекта' name='newProjectName' />
              <Button
                color='primary'
                styles={{ marginTop: '20px' }}
                size='large'
                type='submit'
                onClick={() => console.log('privet')}
              >
                Создать
              </Button>
            </Form>
          </div>
        </Modal>
      )}
    </>
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
