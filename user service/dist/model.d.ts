import mongoose from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=model.d.ts.map