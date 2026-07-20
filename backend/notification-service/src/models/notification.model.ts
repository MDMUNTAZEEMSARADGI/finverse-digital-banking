import mongoose from "mongoose";


const notificationSchema =
new mongoose.Schema(

{
 userId:{
  type:String,
  required:true,
 },


 type:{
  type:String,
  required:true,
 },


 title:{
  type:String,
  required:true,
 },


 message:{
  type:String,
  required:true,
 },


 metadata:{
  type:Object,
  default:{},
 },


 status:{
  type:String,
  enum:[
   "UNREAD",
   "READ"
  ],
  default:"UNREAD",
 },


},

{
 timestamps:true,
}

);


export default mongoose.model(
 "Notification",
 notificationSchema
);