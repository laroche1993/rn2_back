const env = process.env.NODE_ENV


const dev = {
    emailConfig: {
        service: 'gmail',
        auth: {
            user: 'luisangelrochebroche@gmail.com',
            pass: process.env.PASS_EMAIL
        }
    }

}

const prd = {
    emailConfig: {
        service: process.env.SERVICE_MAIL,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    }

}
module.exports = { config: env == "dev" ? dev : prd }