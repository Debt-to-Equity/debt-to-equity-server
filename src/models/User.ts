import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  parentId: Types.ObjectId,
  typeOfUser: String,
  address: {
    street: String,
    postalCode: String,
    city: String,
    province: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date,
  token: {
    string: String,
    createdAt: Date
  }
});

export const Users = mongoose.model('user', UsersSchema)
