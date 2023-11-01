import mongoose  from "mongoose";

const bookShema = mongoose.Schema(
{
    title: {type : String, required: true},
    author: {type : String, require: true},
    publishYear: {type : String, require: true}
},
{
    timestamps:true
}
);

export const Book = mongoose.model('Cat', bookShema);
