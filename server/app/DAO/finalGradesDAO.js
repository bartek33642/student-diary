import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';
import SubjectModel from './subjectsDAO'; // Załóżmy, że masz plik subjectsDAO.js

const finalGradesSchema = new mongoose.Schema({
  finalGradeId: { type: String, unique: true, default: () => uuidv4() },
  subjectId: { type: String, required: true },
  value: { type: Number },
}, {
  collection: 'finalGrades'
});

finalGradesSchema.plugin(mongooseUniqueValidator);

const FinalGradeModel = mongoose.model('finalGrades', finalGradesSchema);

async function createOrUpdateFinalGrade(data) {
  const subjectExists = await SubjectModel.exists({ subjectId: data.subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  if (!mongoose.isValidObjectId(data.subjectId)) {
    throw new Error('Nieprawidłowy format subjectId.');
  }

  if (!data.finalGradeId) {
    return new FinalGradeModel(data).save();
  } else {
    return FinalGradeModel.findByIdAndUpdate(data.finalGradeId, data, { new: true });
  }
}

async function getFinalGradesBySubject(subjectId) {
  const subjectExists = await SubjectModel.exists({ subjectId: subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  return FinalGradeModel.find({ subjectId: subjectId });
}

async function deleteFinalGrade(finalGradeId) {
  return FinalGradeModel.findByIdAndRemove(finalGradeId);
}

export default {
  createOrUpdateFinalGrade: createOrUpdateFinalGrade,
  getFinalGradesBySubject: getFinalGradesBySubject,
  deleteFinalGrade: deleteFinalGrade
};
