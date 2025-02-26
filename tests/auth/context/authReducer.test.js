import { authReducer, types } from "../../../src/auth";


describe('Pruebas del authReducer ', () => {

    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    })

    test('debe de (login) llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })

    })

    test('debe de (logout) borrar el name del usuario y logged en false', () => {

        const state = {
            logged: false,
            user: { id: '123', name: 'Juan' }
        };

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action );
        expect( newState ).toEqual({logged: false})

    });

})




// import { types } from "../types/types";

// export const authReducer = (state = {}, action) => {

//     switch (action.type) {

//         case types.login:
//             return {
//                 ...state,
//                 logged: true,
//                 user: action.payload
//             };

//         case types.logout:
//             return {
//                 logged: false,
//             };

//         default:
//             return state;
//     }

// }