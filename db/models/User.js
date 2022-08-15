import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, 'Please provide a user name'],
    // },
    email: {
      type: String,
      requried: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      // required: [true, 'Please add a password'],
      required: [ 
        function() { return this.provider === 'credentials'; },
        'password is required when login with credentials'
      ],
      minlength: 6,
      select: false, // whenever we query for a user, do we want to return the password as well? false -> we don't wans the password to be send back as well unless we explicitly ask the query for it.
    },
    provider: {
      type: String,
      required: true,
      default: 'credentials'
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.provider !== 'credentials') {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre('insertMany', async function (next, docs) {
  if (Array.isArray(docs) && docs.length) {
    const hashedUsers = docs.map(async (user) => {      
      return await new Promise((resolve, reject) => {
        if(user.provider !== 'credentials') {
          return resolve(user);
        }

        bcrypt
          .genSalt(10)
          .then((salt) => {
            let password = user.password.toString();
            bcrypt
              .hash(password, salt)
              .then((hash) => {
                user.password = hash;
                resolve(user);
              })
              .catch((e) => {
                reject(e);
              });
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
    docs = await Promise.all(hashedUsers);
    next();
  } else {
    return next(new Error('User list should not be empty')); // lookup early return pattern
  }
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// UserSchema.methods.getSignedToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString('hex');

//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 mins

//   return resetToken;
// };

const User = models.Users || model('Users', UserSchema);
export default User;
