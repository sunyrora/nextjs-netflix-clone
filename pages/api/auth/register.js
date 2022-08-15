import { registerUser } from "../../../db/controllers/authController";

export default async function handler(req, res) {
    try {
        const { input } = req.body;
        console.log('registerHandler: input: ', input);

        const user = await registerUser(input);
        console.log('registerHandler user: ', user);

        res.status(201).json(user);

    } catch (error) {
        console.error('registerUser: ', error);
        res.status(error.statusCode || 500).json({
            success: false,
            error
        });
    }
};