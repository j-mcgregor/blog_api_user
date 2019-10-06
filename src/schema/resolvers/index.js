import mongoose from "mongoose";
import config from "../../../config";
import User from "../../models/User";

mongoose.Promise = require("bluebird");
mongoose.connect(config.db, { useNewUrlParser: true });

export const resolvers = {
  Query: {
    getUsers: async (_, args, context) => {
      console.log(context);
      const users = await User.find();

      return users;
    },
    getUser: async (_, args) => {
      const user = await User.findOne({ _id: args.id });

      return user;
    }
  },
  Mutation: {
    addUser: (_, args) => {
      const newUser = new User({
        firstName: args.firstName,
        lastName: args.lastName,
        dob: args.dob,
        role: args.role,
        admin: args.admin
      });

      newUser.save();

      return newUser;
    },
    editUser: async (_, args) => {
      const updatedUser = await User.findOneAndUpdate({ _id: args.id }, args, {
        new: true
      });

      return updatedUser;
    },
    deleteUser: async (_, args) => {
      await User.findOneAndDelete({ _id: args.id });

      return true;
    }
  }
};
