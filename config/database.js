module.exports = {
    development: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/brain4hooman_dev',
    },
    production: {
        url: process.env.MONGO_URL,
    }
}