import Card from '../components/Cards/Card';
import Input from '../components/UI/Input/Input';
import ProjectCard from '../components/Cards/Projects/ProjectCard';

const Projects = () => {
  return (
    <div className='projects'>
      <Card title='Недавние проекты' variant='comfortable'></Card>
      <Card
        title='Поиск по всем проектам'
        variant='comfortable'
        styles={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
      >
        <div className='control'>
          <Input label='Поиск по проектам' />
          <div className='control-buttons'>
            <div className='control-button'>L</div>
            <div className='control-button'>R</div>
          </div>
        </div>
        <div className='control'>
          <div>
            <span>Сортировать по: </span>
            <span>дате изменения</span>
          </div>
          <div className='project-count'>1-5 из 5 проектов</div>
        </div>
      </Card>
      <Card
        variant='comfortable'
        styles={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
      >
        <ProjectCard title='Крымский проект' lastUpdated='10.11.2003' />
        <ProjectCard title='Проект по уралу' isMyProject />
      </Card>
    </div>
  );
};

export default Projects;
