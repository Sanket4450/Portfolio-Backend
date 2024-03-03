import { Schema, model } from 'mongoose'

const sessionSchema = new Schema(
    {
        token: {
            type: String,
            trim: true,
            required: true,
            index: true,
        },
        lastActiveAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
)

export default model('Session', sessionSchema)
