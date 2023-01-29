import Card from '../components/Cards/Card';
import Input from '../components/UI/Input/Input';
import ProjectCard from '../components/Cards/Projects/ProjectCard';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';
import { getProjects } from '../store/project';
import { useSelector } from 'react-redux';
import { findMatch, sortProjectsBy } from '../utils';
import { IProject } from '../store/project/type';
import Button from '../components/UI/Button/Button';
import Select from '../components/UI/Select/Select';

const Projects = () => {
  const dispatch = useAppDispatch();
  const projectsAPI = useSelector((state: RootState) => state.project.projects);
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [searchedProjects, setSearchedProjects] = useState<Array<IProject>>([]);
  const [elementToSearch, setElementToSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [currentPage, setCurrentPage] = useState<number>(1);
  // TODO: заменить на useMemo
  const [countBorders, setCountBorders] = useState<Array<number>>([1, 1]);
  const [pages, setPages] = useState<number>(1);

  const goToNextPage = () => {
    if (currentPage >= pages) {
      setCurrentPage(1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(pages);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const onSearchProject = (name: string) => {
    setElementToSearch(name);
    const findedProjects: Array<IProject> = findMatch(projectsAPI, name);
    setSearchedProjects(findedProjects);
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    const sortedProjects = sortProjectsBy({ array: projectsAPI, by: sortBy });
    const resultProjects = sortedProjects.slice(
      5 * (currentPage - 1),
      5 * currentPage
    );
    setProjects(resultProjects);
    setPages(Math.ceil(sortedProjects.length / 5));
    const leftCountBorder = 5 * (currentPage - 1) + 1;
    const rightCountBorder = leftCountBorder + projects.length - 1;
    setCountBorders([leftCountBorder, rightCountBorder]);
  }, [currentPage, projects.length, projectsAPI, sortBy]);
  return (
    <div className='projects'>
      <Card
        title='Недавние проекты'
        variant='comfortable'
        styles={{ display: 'flex', gap: '29px' }}
      >
        <ProjectCard view={2} title='Крымский проект' isMyProject id={1} />
        <ProjectCard view={2} title='Проект по уралу' id={1} />
      </Card>
      <Card
        title='Поиск по всем проектам'
        variant='comfortable'
        styles={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
      >
        <div className='control'>
          <Input
            label='Поиск по проектам'
            onInput={onSearchProject}
            prevIcon='/images/icons/loupe.svg'
          />
          <div className='control-buttons'>
            <div className='control-button' onClick={goToPrevPage}>
              <img src='/images/icons/control-arrow.svg' alt='' />
            </div>
            <div
              className='control-button'
              onClick={goToNextPage}
              style={{ transform: 'rotate(180deg)' }}
            >
              <img src='/images/icons/control-arrow.svg' alt='' />
            </div>
          </div>
        </div>
        <div className='control'>
          <div>
            <span>Сортировать по: </span>
            <Select
              state={sortBy}
              setState={setSortBy}
              options={['name', 'date', 'option3', 'option4']}
            />
          </div>
          <div className='project-count'>
            {countBorders[0]}-{countBorders[1]} из {projectsAPI.length} проектов
          </div>
        </div>
      </Card>
      <Card
        variant='comfortable'
        styles={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
      >
        {elementToSearch?.length && searchedProjects?.length ? (
          searchedProjects.map((project: IProject) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              title={project.name}
              lastUpdated='10.11.2003'
              isMyProject
            />
          ))
        ) : !elementToSearch.length && projects?.length ? (
          projects.map((project: IProject) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              title={project.name}
              lastUpdated='10.11.2003'
              isMyProject
            />
          ))
        ) : (
          <div className='d-flex f-column jc-c ai-c'>
            <span>Не найдено ни одного проекта с названием</span>
            <span style={{ fontWeight: 700 }}>{elementToSearch}</span>
            <Button
              color='secondary'
              styles={{ marginTop: '21px' }}
              onClick={() => console.log('asd')}
            >
              Создать проект
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Projects;
