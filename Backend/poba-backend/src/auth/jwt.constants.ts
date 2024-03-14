export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'spanok',
    expiresIn: '1d',
};