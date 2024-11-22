import mongoose, { Schema, Document } from "mongoose";

export interface IField {
    id: string;
    type: "email" | "text" | "password" | "number" | "date";
    title: string;
    order: number;
}

export interface IForm extends Document {
    title: string;
    fields: IField[];
}

const FieldSchema = new Schema<IField>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
});

const FormSchema = new Schema<IForm>({
    title: { type: String, required: true },
    fields: { type: [FieldSchema], required: true },
});

export const Form = mongoose.model<IForm>("Form", FormSchema);
