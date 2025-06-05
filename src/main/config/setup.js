module.exports = app => {
    app.disable('x-powered-by')
    app.use((req, res, next) => {
        next()
    })
}