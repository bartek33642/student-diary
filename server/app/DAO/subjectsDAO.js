import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const subjectsSchema = new mongoose.Schema({
  subjectId: { type: String, unique: true, default: () => uuidv4() },
  name: { type: String, unique: true, required: true },
}, {
  collection: 'subjects'
});

subjectsSchema.plugin(mongooseUniqueValidator);

const SubjectModel = mongoose.model('subjects', subjectsSchema);

async function query() {
  try {
    return await SubjectModel.find({});
  } catch (error) {
    throw new Error(`Błąd w trakcie pobierania przedmiotów: ${error.message}`);
  }
}

async function get(id) {
  try {
    return await SubjectModel.findOne({ subjectId: id });
  } catch (error) {
    throw new Error(`Błąd w trakcie pobierania przedmiotu: ${error.message}`);
  }
}

async function createOrUpdate(data) {
  try {
    if (!data.subjectId) {
      return await new SubjectModel(data).save();
    } else {
      return await SubjectModel.findOneAndUpdate({ subjectId: data.subjectId }, { name: data.name }, { new: true });
    }
  } catch (error) {
    throw new Error(`Błąd w trakcie tworzenia lub aktualizacji przedmiotu: ${error.message}`);
  }
}

async function deleteSubject(id) {
  try {
    const result = await SubjectModel.findOneAndDelete({ _id: id });
    
    if (!result) {
      console.log("Dokument do usunięcia nie został znaleziony.");
    } else {
      console.log("Przedmiot został pomyślnie usunięty.");
    }

    return result;
  } catch (error) {
    console.error('Błąd podczas usuwania przedmiotu:', error);
    throw new Error(`Błąd w trakcie usuwania przedmiotu: ${error.message}`);
  }
}




export default {
  query: query,
  get: get,
  createOrUpdate: createOrUpdate,
  model: SubjectModel,
  deleteSubject: deleteSubject,
};
