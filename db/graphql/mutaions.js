import { gql } from 'apollo-server-micro';

export const MUTATION_CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            _id
            email
            provider
            image
        }
    }
`;

