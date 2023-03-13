import { useState } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

interface ObjectCardProps {
  id: number;
  title: string;
}

const ObjectCard = ({ id, title }: ObjectCardProps) => {
  const [fields, setFields] = useState<any>([
    {
      name: 'id',
      value: id,
    },
  ]);

  const addEmptyField = () => {
    setFields((prev: any) => [...prev, { name: '', value: '' }]);
  };

  return (
    <div
      className='absolute left-64 top-80 center p-4 max-w-xss rounded-lg cursor-move'
      style={{ background: '#F7F9FC', width: '100%' }}
    >
      <div className='flex justify-between items-center'>
        <h6>{title}</h6>
        <Button
          color='secondary'
          variant='circle'
          styles={{ width: '20px', height: '20px' }}
        >
          <img
            src='/images/icons/plus.svg'
            alt=''
            style={{ transform: 'rotate(45deg)' }}
          />
        </Button>
      </div>
      <ul className='flex flex-col gap-1 mt-3'>
        {fields.map((field: any) => (
          <li className='flex gap-1'>
            <Field {...field} />
          </li>
        ))}
        <div className='flex gap-1 mt-1 items-center ml-2'>
          <span className='text-vsm cursor-pointer' onClick={addEmptyField}>
            Добавить поле
          </span>
          <img
            src='/images/icons/plus.svg'
            alt=''
            style={{ width: '6px', height: '6px' }}
            className='cursor-pointer'
            onClick={addEmptyField}
          />
        </div>
        <div className='flex flex-col mt-4'>
          <div className='flex gap-1 items-center'>
            <span className='text-xss font-bold'>Фото</span>
            <img
              src='/images/icons/data/upload.svg'
              alt=''
              className='w-2 h-2'
            />
          </div>
          <div className='flex gap-2 mt-2 w-full'>
            <div className='w-10 h-10 bg-slate-500 rounded-lg'></div>
            <div className='flex flex-col justify-between'>
              <Input placeholder='Ссылка на картинку' size='small' />
              <div className='flex gap-1 items-center self-end'>
                <span className='text-vsm font-semibold'>Удалить фото</span>
                <img
                  src='/images/icons/data/trash.svg'
                  alt=''
                  className='w-2 h-2'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='flex gap-1 items-center'>
            <span className='text-xss font-bold'>Загрузить модель</span>
            <img
              src='/images/icons/data/upload.svg'
              alt=''
              className='w-2 h-2'
            />
          </div>
        </div>
        <div className='flex gap-1 self-end mt-6'>
          <Button color='secondary' size='small'>
            Удалить
          </Button>
          <Button color='primary' size='small'>
            Сохранить
          </Button>
        </div>
      </ul>
    </div>
  );
};

const Field = ({ name, value }: any) => {
  console.log(name, value);
  return (
    <div className='flex gap-1 w-full'>
      <Input defaultValue={name} size='small' disabled={name === 'id'} />
      <Input defaultValue={`${value}`} size='small' disabled={name === 'id'} />
    </div>
  );
};

export default ObjectCard;
