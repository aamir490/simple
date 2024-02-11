import { Schema, model, models } from "mongoose";
// import defaultpic from "../public/default.png";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true }, ///pasword ko true karna hai
    image: { type: String, required: true, default: "http://localhost:3000/default.png" },
    contestNotification:{type: Boolean, default:false},
    background: { type: String, required: true, default: "http://localhost:3000/background.png" },
    currentStatus: { type: String, required: true, trim: true , default:'saboo'}, ///currentStatus ko true karna hai
    skills: [
      {
        skill: { type: String },
        rank: { type: Number },
        points: { type: Number },
        achievements:{ type: Number }
      },
    ],
    badges: { type: String, required: true, trim: true, default: "Badges" },
    college: { type: String, required: true, trim: true, default: "College" },
    location: { type: String, trim: true, default:'' },
    designation: { type: String, trim: true},
    statusIcons: { type: Array, trim: true, default:[] },
    praise: { type: Number, required: true, trim: true, default: 0 },
    rank: { type: Number, required: true, trim: true, default: 0 },
    level: { type: Number, required: true, trim: true, default: 0 },
    points: { type: Number, required: true, trim: true, default: 0 },
    achievements: { type: Number, required: true, trim: true, default: 0 },
    isNewUser: { type: Boolean, default:true}, // this field for identify that user is new or exist
    emailVerified: { type: Boolean, default: false }, // Add this field for email verification
    lastSeen: { type: String },
    userActive: { type: Boolean },
    role: {type:String}
  },
  { timestamps: true }
);

// const User = models.User || model("User", UserSchema);
const User = models && models.User ? models.User : model("User", UserSchema);

export default User;