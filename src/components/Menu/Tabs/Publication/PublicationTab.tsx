import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './index.sass';

const PublicationTab = () => {
  const onCopy = (input: HTMLInputElement): void => {
    input.select();
    document.execCommand('copy');
    input.focus();
  };

  return (
    <div className='tab tab-publication'>
      <h4>Поделиться ссылкой проекта</h4>
      {/* TODO: добавить в параметры url ключ доступа */}
      <Input
        defaultValue={window.location.href}
        readonly
        appendIcon='/images/icons/copy.svg'
        onAppendIconClick={onCopy}
      />
      <h4>Доступ к проекту</h4>
      <Input label='Email' />
      {/* TODO: поле с добавленными к проекту микрочелами */}
      <div className='presentation'>
        <div className='d-flex jc-sb ai-c'>
          <h4>Создать презентацию</h4>
          <Button color='secondary' variant='circle' size='small'>
            <img src='/images/icons/plus.svg' alt='' />
          </Button>
        </div>

        <span>
          Тут какой-нибудь поясняющий текст
          <br />
          про сервис с презентациями
        </span>
      </div>
    </div>
  );
};

export default PublicationTab;
