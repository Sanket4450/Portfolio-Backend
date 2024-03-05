import { VerifaliaRestClient } from 'verifalia'

export default new VerifaliaRestClient({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
})
