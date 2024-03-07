import nodemailer from 'nodemailer'
import httpStatus from 'http-status'
import ejs from 'ejs'
import fs from 'fs'
import util from 'util'
import ApiError from './ApiError.js'

const readFileAsync = util.promisify(fs.readFile)

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendMail = async ({ email, subject, templateFile, data }) => {
    try {
        const htmlContent = await readFileAsync(templateFile, 'utf-8')

        const renderedHtml = ejs.render(htmlContent, data)

        const mailOptions = {
            from: `${process.env.EMAIL_HOST} <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html: renderedHtml,
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}
