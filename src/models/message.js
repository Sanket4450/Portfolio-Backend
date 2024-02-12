import { Schema, model } from 'mongoose'

const messageSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
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
        mobile: {
            type: Number,
        },
        subject: {
            type: String,
            maxLength: 100,
            required: true,
        },
        description: {
            type: String,
            maxLength: 500,
            required: true,
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
)

export default model('Message', messageSchema)
