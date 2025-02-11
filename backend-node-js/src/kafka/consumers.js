import Grade from "../models/Grade.js";
import { consumeMessage } from "./index.js";

export const deleteGradesConsumer = async () => {
  await consumeMessage({
    topic: "student-deletion",
    action: async (value) => {
      const ids = Array.isArray(value) ? value : [value];
      try {
        const result = await Grade.deleteMany({ student_id: { $in: ids } });
        if (result.deletedCount === 0) return console.error("Grades not found");
        console.log(`Grades of students with the following ids ${ids.toString()} were deleted`);
      } catch (error) {
        console.error(error.message);
      }
    },
  });
};
