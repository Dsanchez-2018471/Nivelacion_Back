import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

const User = require('./user.model');

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el perfil', error });
    }
};

export default mongoose.model("Users", UserSchema);
