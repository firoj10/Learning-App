import mongoose from "mongoose";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

export async function getAllQuizSets(excludeUnPublished?: boolean) {
  try {
    let quizSets: any[] = [];

    if (excludeUnPublished) {
      quizSets = await Quizset.find({ active: true }).lean();
    } else {
      quizSets = await Quizset.find().lean();
    }

    return replaceMongoIdInArray(quizSets);
  } catch (e: any) {
    throw new Error(e?.message || e);
  }
}

export async function getQuizSetById(id: string) {
  try {
    // ✅ invalid ObjectId => treat as "not found" (return null)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const quizSet = await Quizset.findById(id)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();

    // ✅ not found => return null (DON'T pass null into replaceMongoIdInObject)
    if (!quizSet) return null;

    return replaceMongoIdInObject(quizSet);
  } catch (e: any) {
    throw new Error(e?.message || e);
  }
}

export async function createQuiz(quizData: any) {
  try {
    const quiz = await Quiz.create(quizData);
    return quiz._id.toString();
  } catch (e: any) {
    throw new Error(e?.message || e);
  }
}
