import axios from 'axios';
import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { setSearchItems, setSearchText } from '../../store/map';
import { RootState } from '../../store/reducer';
import Input from '../UI/Input/Input';

interface GeocoderProps {
  classNames: string;
}

const Geocoder = ({ classNames }: GeocoderProps) => {
  const dispatch = useAppDispatch();
  const { text, status } = useSelector(
    (state: RootState) => state.map.controls.search
  );

  const inputHandler = (text: string) => {
    dispatch(setSearchText(text));
  };

  useEffect(() => {
    if (text) {
      axios
        .get('search', {
          params: {
            q: text,
            format: 'json',
          },
          baseURL: 'https://nominatim.openstreetmap.org',
        })
        .then(response => dispatch(setSearchItems(response.data)));
    }
  }, [text]);

  useEffect(() => {
    if (!status) {
      dispatch(setSearchText(''));
      dispatch(setSearchItems([]));
    }
  }, [dispatch, status]);

  return (
    <Input
      size='small'
      className={classNames}
      onInput={(text: string) => inputHandler(text)}
      value={text}
    />
  );
};

export default Geocoder;
