const env = process.env.NODE_ENV


const dev = {
    emailConfig: {
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    }

}

const prd = {
    emailConfig: {
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    }

}
module.exports = { config: env == "dev" ? dev : prd }