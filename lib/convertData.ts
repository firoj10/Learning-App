
// type WithMongoId = {
//   _id: { toString(): string };
//   [key: string]: any;
// };

// export const replaceMongoIdInArray = <T extends WithMongoId>(array: T[]) => {
//   const mappedArray = array
//     .map((item) => {
//       return {
//         id: item._id.toString(),
//         ...item,
//       };
//     })
//     .map(({ _id, ...rest }) => rest);

//   return mappedArray;
// };

// export const replaceMongoIdInObject = <T extends WithMongoId>(obj: T | null | undefined) => {
//   if (!obj) return null;

//   const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
//   return updatedObj;
// };

// export const getSlug = (title: string | null | undefined) => {
//   if (!title) return null;

//   const slug = title
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^\w-]+/g, "");

//   return slug;
// };

type WithMongoId = {
  _id?: { toString(): string }; // ✅ allow missing _id (runtime reality)
  id?: string;
  [key: string]: any;
};

export const replaceMongoIdInArray = <T extends WithMongoId>(array: T[]) => {
  const mappedArray = (array ?? [])
    .map((item) => {
      return {
        id: item?._id?.toString?.() ?? item?.id ?? "", // ✅ prevent crash
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = <T extends WithMongoId>(
  obj: T | null | undefined
) => {
  if (!obj) return null;

  const { _id, ...updatedObj } = {
    ...obj,
    id: obj?._id?.toString?.() ?? obj?.id ?? "", // ✅ prevent crash
  };

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
