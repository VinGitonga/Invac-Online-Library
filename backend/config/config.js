const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3005,
    jwtSecret: process.env.JWT_SECRET || 'SomehowAmAtPeaceWithALotOfStuff',
    googleCloudId: process.env.GGOOGLE_CLIENT_ID || "931496288863-tt56o3285nauk0bmufd63d162es6553u.apps.googleusercontent.com",
    mongoUri: process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + '/zara2039'
}

export default config;