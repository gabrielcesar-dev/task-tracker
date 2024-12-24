if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in .env file")
}
if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file")
}

export const ENV = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET
}