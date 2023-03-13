import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/reducer';
import Button from '../../../../UI/Button/Button';
import Select from '../../../../UI/Select/Select';
import './index.sass';

const LayerData = () => {
  const { id, name } = useSelector(
    (state: RootState) => state.map.user.selectedLayer
  );
  return (
    <div className='sub-menu sub-menu-layerdata flex flex-col gap-7'>
      <h3 className='ml-3'>{name}</h3>
      <h5>Управление слоем</h5>
      <div className='layer-controller flex flex-col pt-3 pr-5 pb-3 pl-4'>
        <div className='grid grid-cols-3 gap-3 items-center'>
          <img
            src='/images/icons/layers/cloud-off.svg'
            alt=''
            className='col-span-1'
          />
          <span className='text-xss font-bold col-span-2'>
            Загрузить в оперативную память
          </span>
          <div className='self-end'>tgl</div>
        </div>
        <div className='grid grid-cols-3 gap-3 items-center'>
          <img src='/images/icons/layers/eye-closed.svg' alt='' />
          <span className='text-xss font-bold'>Сделать видимым</span>
          <div>tgl</div>
        </div>
        <div className='flex gap-3 mt-4 self-end'>
          <Button size='small' color='secondary'>
            Удалить
          </Button>
          <Button size='small' color='primary'>
            Редактировать
          </Button>
        </div>
      </div>
      <div className='mt-5'>
        <h5>Источник данных</h5>
        <Select state='Точки рекогносцировки' />
      </div>
      <div className='mt-5'>
        <h5>Параметры слоя</h5>
        <Select state='Точки рекогносцировки' />
      </div>
    </div>
  );
};

export default LayerData;
