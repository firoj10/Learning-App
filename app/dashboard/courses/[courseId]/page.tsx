import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";

import AlertBanner from "@/components/alert-banner";

import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";
import { CourseActions } from "./_components/course-action";
import { QuizSetForm } from "./_components/quiz-set-form";

import { getCategories } from "@/queries/categories";
import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

type CategoryItem = {
  title: string;
  _id?: { toString(): string };
  id?: string;
};

type ModuleLike = {
  _id?: { toString(): string } | string;
  id?: string;
  title?: string;
  slug?: string;
  active?: boolean;
  course?: { toString(): string } | string;
  lessonIds?: unknown;
  order?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  __v?: number;
  [key: string]: any;
};

const EditCourse = async ({ params }: PageProps) => {
  const { courseId } = await params;

  const course = await getCourseDetails(courseId);
  const categories = (await getCategories()) as CategoryItem[];

  const mappedCategories = categories.map((c) => {
    return {
      value: c.title,
      label: c.title,
      id: c._id?.toString?.() || c.id,
    };
  });

  // course?.modules may contain mongoose docs / ObjectId values
  const modules = replaceMongoIdInArray(course?.modules as ModuleLike[]).sort(
    (a: ModuleLike, b: ModuleLike) => (a.order ?? 0) - (b.order ?? 0)
  );
const toPlain = <T>(data: T): T =>
  JSON.parse(JSON.stringify(data));

const modulesPlain = toPlain(modules);


  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />

      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            <TitleForm initialData={{ title: course?.title }} courseId={courseId} />

            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={courseId}
            />

            <ImageForm
              initialData={{
                imageUrl: course?.thumbnail
                  ? `/assets/images/courses/${course.thumbnail}`
                  : "",
              }}
              courseId={courseId}
            />

            <CategoryForm
              initialData={{ value: course?.category?.title }}
              courseId={courseId}
              options={mappedCategories}
            />

            <QuizSetForm initialData={{}} courseId={courseId} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              {/* FIX: pass modulesPlain (serializable) */}
              <ModulesForm initialData={modulesPlain} courseId={courseId} />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>

              <PriceForm initialData={{price: course?.price}} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
