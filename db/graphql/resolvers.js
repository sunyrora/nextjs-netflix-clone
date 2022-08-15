import { getAllUsers, getUserById, registerUser } from "../controllers/authController";


const resolvers = {
    Query: {
        users: async () => {
            console.log('users...');
            return await getAllUsers();
        },
        user: async (parent, args) => {
            const {_id } = args 
            console.log('user id: ', _id);
            return await getUserById(_id);
        }
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            console.log("createuser: ", args);
            const { email, password } = args.input;
            return await registerUser(args.input);
        },
        updateUsername: (parent, args, context) => {
            console.log('updateUsername: ', args);
        },
        deleteUser: (parent, args, context) => {
                console.log('deleteUser: ', args);
        }
    }
}

export default resolvers;