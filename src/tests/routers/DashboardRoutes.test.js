import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Pruebas en DashboardRoutes", () => {

    const contextValue = {
        user: {
            logged: true,
            name: "Luis"
        }
    }
    
    test("Debe de mostrar correctamente el componente Marvel", () => {

        const wrapper = mount(
    
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
    
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe("Luis");
    });

    test("Debe de mostrar correctamente el componente DC", () => {

        const wrapper = mount(
    
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/dc"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
    
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("h1").text().trim()).toBe("DC Screen");
    });
    
});