import { Schema, model } from 'mongoose'

const replySchema = new Schema(
    {
        messageId: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true,
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

export default model('Reply', replySchema)
