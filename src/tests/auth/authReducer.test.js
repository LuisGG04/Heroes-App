import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en el authReducer", () => {
    test("Debe de retornar el estado por defecto", () => {
        
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});

    });
   
    test("Debe de autenticar y colocar el 'name' del usuario", () => {
        const action = {
            type: types.login,
            payload: {
                name: "Luis"
            }
        }

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({logged: true, name:"Luis"});
    });
    
    test("Debe de borrar el name y pasar el logged en false", () => {
        const action = {
            type: types.logout
        }

        const state = authReducer({logged: true, name: "Luis"}, action);

        expect(state).toEqual({logged: false});
    })
    
});
