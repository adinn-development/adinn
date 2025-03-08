export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: Date;
 
}
