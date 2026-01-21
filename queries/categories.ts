// import { Category } from "@/model/category-model";
// import { replaceMongoIdInArray } from "@/lib/convertData";

// export async function getCategories() {
//     const categories = await Category.find({}).lean();
//     return replaceMongoIdInArray(categories);
// }


import { dbConnect } from "@/service/mongo";
import { Category } from "@/model/category-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

export async function getCategories() {
  await dbConnect(); // ⚠️ Must connect first
  const categories = await Category.find({}).lean();
  return categories;
}
export async function getCategoryDetails(categoryId) {
    try {
        const category = await Category.findById(categoryId).lean();
        return replaceMongoIdInObject(category);
    } catch (error) {
        throw new Error(error);
    }

}