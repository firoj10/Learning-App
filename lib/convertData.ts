// export const replaceMongoIdInArray = (array) => {
//     const mappedArray = array.map(item => {
//       return {
//         id: item._id.toString(),
//         ...item
//       }
//     }).map(({_id, ...rest}) => rest);

//     return mappedArray;
//   }

//   export const replaceMongoIdInObject = (obj) => {
//     const {_id, ...updatedObj} = {...obj, id: obj._id.toString()};
//    return updatedObj;
//   }

// export const replaceMongoIdInArray = <T extends { _id?: any }>(array: T[]): (Omit<T, "_id"> & { id: string })[] => {
//   return array.map(item => {
//     const { _id, ...rest } = item;
//     return { ...rest, id: _id?.toString() ?? "" };
//   });
// };

// export const replaceMongoIdInObject = <T extends { _id?: any }>(obj: T | null | undefined): (Omit<T, "_id"> & { id: string }) | null | undefined => {
//   if (!obj) return obj;

//   const { _id, ...rest } = obj;
//   return { ...rest, id: _id?.toString() ?? "" };
// };

type WithMongoId = {
  _id: { toString(): string };
  [key: string]: any;
};

export const replaceMongoIdInArray = <T extends WithMongoId>(array: T[]) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = <T extends WithMongoId>(obj: T | null | undefined) => {
  if (!obj) return null;

  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export const getSlug = (title: string | null | undefined) => {
  if (!title) return null;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slug;
};

