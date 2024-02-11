import { Schema, model } from 'mongoose'

const reviewSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        message: {
            type: String,
            maxLength: 500,
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
)

export default model('Review', reviewSchema)
