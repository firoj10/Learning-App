// import { Category } from "@/model/category-model";
// import { replaceMongoIdInArray } from "@/lib/convertData";

// export async function getCategories() {
//     const categories = await Category.find({}).lean();
//     return replaceMongoIdInArray(categories);
// }


import { dbConnect } from "@/service/mongo";
import { Category } from "@/model/category-model";

export async function getCategories() {
  await dbConnect(); // ⚠️ Must connect first
  const categories = await Category.find({}).lean();
  return categories;
}
