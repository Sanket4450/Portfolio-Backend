import { Schema, model } from 'mongoose'

const sessionSchema = new Schema(
    {
        token: {
            type: String,
            trim: true,
            required: true,
            index: true
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
)

export default model('Session', sessionSchema)
