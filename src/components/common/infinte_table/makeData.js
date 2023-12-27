import { faker } from '@faker-js/faker';

// Person type in JavaScript
// {
//   id: number,
//   firstName: string,
//   lastName: string,
//   age: number,
//   visits: number,
//   progress: number,
//   status: 'relationship' | 'complicated' | 'single',
//   createdAt: Date
// }

// PersonApiResponse type in JavaScript
// {
//   data: Person[],
//   meta: {
//     totalRowCount: number
//   }
// }

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (index) => {
  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
    status: faker.helpers.shuffle(['relationship', 'complicated', 'single'])[0],
  };
};

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(d),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(1000);

// Simulates a backend api
export const fetchData = (start, size, sorting) => {
  const dbData = [...data];
  if (sorting.length) {
    const sort = sorting[0];
    const { id, desc } = sort;
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};
