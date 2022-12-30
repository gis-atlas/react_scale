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
  console.log(array, element);
  if (!array) return [];
  return [...array].filter((arrItem) =>
    arrItem.name.toLowerCase().includes(element.toLowerCase())
  );
};
