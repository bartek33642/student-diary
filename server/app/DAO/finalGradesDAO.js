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
  console.log('Próba zapisania nowej oceny końcowej:', data);

  const subjectExists = await SubjectModel.model.findOne({ _id: data.subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  if (!mongoose.isValidObjectId(data.subjectId)) {
    throw new Error('Nieprawidłowy format subjectId.');
  }

  if (data.finalGradeId) {
    const finalGradeExists = await FinalGradeModel.findOne({ _id: data.finalGradeId });
    if (!finalGradeExists) {
      throw new Error('Ocena końcowa o podanym finalGradeId nie istnieje.');
    }
    const updatedFinalGrade = await FinalGradeModel.findOneAndUpdate({ _id: data.finalGradeId }, data, { new: true });
    console.log('Zaktualizowano ocenę końcową:', updatedFinalGrade);
    return updatedFinalGrade;
  } else {
    const newFinalGrade = new FinalGradeModel(data);
    const savedFinalGrade = await newFinalGrade.save();
    console.log('Dodano nową ocenę końcową:', savedFinalGrade);
    return savedFinalGrade;
  }
}


async function getFinalGradesBySubject(subjectId) {
  const subjectExists = await SubjectModel.model.findOne({ _id: subjectId });
  if (!subjectExists) {
    throw new Error('Przedmiot o podanym subjectId nie istnieje.');
  }

  return FinalGradeModel.find({ subjectId: subjectId });
}

async function deleteFinalGrade(finalGradeId) {
  return FinalGradeModel.findOneAndDelete({_id: finalGradeId});
}

export default {
  createOrUpdateFinalGrade: createOrUpdateFinalGrade,
  getFinalGradesBySubject: getFinalGradesBySubject,
  deleteFinalGrade: deleteFinalGrade
};
