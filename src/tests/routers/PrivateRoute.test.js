import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Navigate: () => <span>Sin autenticar</span>
}));

describe("Pruebas en la ruta PrivateRoute", () => {

    Storage.prototype.setItem = jest.fn();

    test("Debe de mostrar el componente si está autenticado y guardar en localStorage", () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: "Luis"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.text().trim()).toBe("Private Component");
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
    });

    test("Debe que debe de estar autenticado", () => {
        
        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.find("span").exists()).toBe(true);
    });
    
});
