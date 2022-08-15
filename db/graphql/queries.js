import { gql } from 'apollo-server-micro';

const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
            _id
            email
            provider
            image
        }
    }
`;

const GET_USER_BY_ID = gql`
    query getUserById($_id: string) {
        user {
            _id
            email
            provider
            image
        }
    }
`;

export { GET_ALL_USERS, GET_USER_BY_ID };