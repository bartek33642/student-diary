import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';
import subjectsDAO from './subjectsDAO';

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
  try {
    console.log('Checking if subject exists...');
    const subject = await subjectsDAO.model.findOne({ _id: data.subjectId });
    const subjectExists = subject !== null;
    if (!subjectExists) {
      throw new Error('Przedmiot o podanym subjectId nie istnieje.');
    }

    if (!mongoose.isValidObjectId(data.subjectId)) {
      throw new Error('Nieprawidłowy format subjectId.');
    }

    if (!data.gradeId) {
      console.log('Creating new grade...');
      return new GradeModel(data).save();
    } else {
      console.log('Updating existing grade...');
      return GradeModel.findByIdAndUpdate(data.gradeId, data, { new: true });
    }
  } catch (error) {
    console.error(`Error in createOrUpdateGrade: ${error.message}`);
    throw error;
  }
}

async function getGradesBySubject(subjectId) {
  try {
    console.log('Checking if subject exists...');
    const subject = await subjectsDAO.model.findOne({ _id: subjectId });
    const subjectExists = subject !== null;
    if (!subjectExists) {
      throw new Error('Przedmiot o podanym subjectId nie istnieje.');
    }

    console.log('Fetching grades for subject...');
    return GradeModel.find({ subjectId: subjectId });
  } catch (error) {
    console.error(`Error in getGradesBySubject: ${error.message}`);
    throw error;
  }
}

async function deleteGrade(gradeId) {
  try {
    console.log('Deleting grade...');
    return GradeModel.findOneAndDelete({_id: gradeId});
  } catch (error) {
    console.error(`Error in deleteGrade: ${error.message}`);
    throw error;
  }
}

export default {
  createOrUpdateGrade: createOrUpdateGrade,
  getGradesBySubject: getGradesBySubject,
  deleteGrade: deleteGrade
};