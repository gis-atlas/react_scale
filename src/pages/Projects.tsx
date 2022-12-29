import Card from '../components/Cards/Card';
import Input from '../components/UI/Input/Input';

const Projects = () => {
  return (
    <div className='projects'>
      <Card title='Недавние проекты'></Card>
      <Card
        title='Поиск по всем проектам'
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
      <Card></Card>
    </div>
  );
};

export default Projects;
