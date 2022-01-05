import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe("Pruebas en el componente Navbar", () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "Luis"
        }
    }

    test("Debe de mostrar correctamente el componente", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route path="/" element={<Navbar />}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe("Luis");
    });

    test("Debe de mostrar llamar las funciones correctamente", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Navbar />}/>
                </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        wrapper.find("button").prop("onClick")();

        expect(contextValue.dispatch).toHaveBeenCalledWith({"type": types.logout});
        expect(mockNavigate).toHaveBeenCalledWith("/login", {
            replace: true
        });
    });
    
});
