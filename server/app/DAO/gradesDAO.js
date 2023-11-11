import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';
import SubjectModel from './subjectsDAO'; // Załóżmy, że masz plik subjectsDAO.js

const gradesSchema = new mongoose.Schema({
  gradeId: { type: String, unique: true, default: () => uuidv4() },
  value: { type: Number },
  weight: { type: Number },
  comment: { type: String },
  subjectId: { type: String, required: true },
}, {
  collection: 'grades'
});

gradesSchema.plugin(mongooseUniqueValidator);

const GradeModel = mongoose.model('grades', gradesSchema);

async function createOrUpdateGrade(data) {
  const subjectExists = await SubjectModel.exists({ subjectId: data.subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  if (!mongoose.isValidObjectId(data.subjectId)) {
    throw new Error('Nieprawidłowy format subjectId.');
  }

  if (!data.gradeId) {
    return new GradeModel(data).save();
  } else {
    return GradeModel.findByIdAndUpdate(data.gradeId, data, { new: true });
  }
}

async function getGradesBySubject(subjectId) {
  const subjectExists = await SubjectModel.exists({ subjectId: subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  return GradeModel.find({ subjectId: subjectId });
}

async function deleteGrade(gradeId) {
  return GradeModel.findByIdAndRemove(gradeId);
}

export default {
  createOrUpdateGrade: createOrUpdateGrade,
  getGradesBySubject: getGradesBySubject,
  deleteGrade: deleteGrade
};
