import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, default: () => uuidv4() },
  first_name: { type: String },
  second_name: { type: String },
  birth_date: { type: Date },
}, {
  collection: 'user'
});

userSchema.plugin(mongooseUniqueValidator);

const UserModel = mongoose.model('user', userSchema);

async function query() {
  try {
    return await UserModel.find({});
  } catch (error) {
    throw new Error(`Błąd w trakcie pobierania użytkowników: ${error.message}`);
  }
}

async function getUser(id) {
  try {
    return await UserModel.findOne({ userId: id });
  } catch (error) {
    throw new Error(`Błąd w trakcie pobierania użytkownika: ${error.message}`);
  }
}

async function addUser(data) {
  try {
    console.log('Received userId:', data.userId);

    if (!data.userId) {
    //   console.log('Przed retun w userDAO - !data.userId');
      return await new UserModel(data).save();
    } else {
      const existingUser = await UserModel.findOne({ _id: data.userId });
      if (existingUser) {
        return await UserModel.findOneAndUpdate(
          { userId: data.userId },
          {
            first_name: data.first_name,
            second_name: data.second_name,
            birth_date: data.birth_date
          },
          { new: true }
        );
      } else {
        throw new Error(`Użytkownik o userId: ${data.userId} nie istnieje.`);
      }
    }
  } catch (error) {
    throw new Error(`Błąd w trakcie tworzenia lub aktualizacji użytkownika: ${error.message}`);
  }
}

async function deleteUser(userId) {
  try {
    console.log('Deleting user...');
    return UserModel.findOneAndDelete({ _id: userId });
  } catch (error) {
    console.error(`Error in deleteUser: ${error.message}`);
    throw error;
  }
}

export default {
  query:  query,
  getUser: getUser,
  addUser: addUser,
  deleteUser: deleteUser,
  UserModel,
};
