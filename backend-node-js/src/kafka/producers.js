import { sendMessage } from "./index.js";
import Grade from "../models/Grade.js";

const calculateAverage = async (student_id) => {
  try {
    const result = await Grade.aggregate([
      { $match: { student_id } },
      { $group: { _id: "$student_id", average: { $avg: "$grade" } } },
      { $project: { _id: 0, average: { $round: ["$average", 2] } } },
    ]);
    if (!result.length) return console.error("This student has no grades!");

    const average = result[0].average || 0;
    return average;
  } catch (error) {
    console.error(error.message);
  }
};

export const calculateAverageProducer = async (student_id) => {
  try {
    const ids = Array.isArray(student_id) ? student_id : [student_id];

    for (const id of ids) {
      const average = await calculateAverage(id);
      await sendMessage({
        topic: "calculate-average",
        messages: [{ value: JSON.stringify({ student_id: id, average }) }],
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
