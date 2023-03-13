interface IProject {
  id: number;
  name: string;
  notificationChanel?: string;
}

interface ISortProjectsBy {
  array: Array<IProject>;
  by: string;
  reversed?: boolean;
}

export const sortProjectsBy = ({
  array,
  by,
  reversed = false,
}: ISortProjectsBy) => {
  if (!array) return [];
  let result: Array<IProject> = [];
  if (by === 'date') {
    result = [...array];
    // TODO: добавить поле lastChange (или с другим именем) на беке
    // result = array.sort((a: IProject, b: IProject) => {
    //   const [dayA, monthA, yearA] = a.lastChange.split('.');
    //   const [dayB, monthB, yearB] = b.lastChange.split('.');
    //   a = new Date([yearA, monthA, dayA].join('-'));
    //   b = new Date([yearB, monthB, dayB].join('-'));
    //   return a < b;
    // });
  } else if (by === 'name') {
    result = [...array].sort((a, b) => a.name.localeCompare(b.name));
  } else if (by === 'id') {
    result = [...array].sort((a: IProject, b: IProject) => Number(a.id < b.id));
  }
  if (reversed) result.reverse();
  return result;
};

export const findMatch = (array: Array<IProject>, element: string) => {
  if (!array) return [];
  return [...array].filter(arrItem =>
    arrItem.name.toLowerCase().includes(element.toLowerCase())
  );
};

// Отображение слова в определенном склонении в зависимости от числа
export const declOfNum = (n: number, text_variables: Array<string>): string => {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) return text_variables[2];
  if (n1 > 1 && n1 < 5) return text_variables[1];
  if (n1 === 1) return text_variables[0];
  return text_variables[2];
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 0) return '0 B';
  const sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};

export const formatFileType = (type: string) => {
  return type.split('/').reverse()[0].split('+').join('');
};

export const randomRGBA = () => {
  const coef = 255;
  const r = Math.round(Math.random() * coef);
  const g = Math.round(Math.random() * coef);
  const b = Math.round(Math.random() * coef);
  console.log(r, g, b);
  return [r, g, b];
};

export const formatDatasetType = (datasetType: string, id: number) => {
  switch (datasetType) {
    case 'LineString':
      return `Линия ${id}`;
    case 'Point':
      return `Точка рекогносцировки ${id}`;
    case 'Polygon':
      return `Полигон ${id}`;
    default:
      return 'Неизвестно';
  }
};

export const formatDistance = (distance: string) => {
  const dist = Number(distance);
  if (dist < 1) {
    return dist * 1000 + ' m';
  } else {
    return dist + ' km';
  }
};
