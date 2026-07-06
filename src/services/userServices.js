import {hashPassword, verifyPassword}  from '../services/argonServices.js';

export const createUserServices = (userRepository) => ({
    getUserByID: async (id) => {
        const queryResult = await userRepository.findById(id);

        return queryResult;
    },
})