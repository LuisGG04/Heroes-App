import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), 
    useNavigate: () => mockNavigate
}));

describe("Pruebas en SearchScreen", () => {
    
    test("Debe de mostrar el componente", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Buscar un héroe");
    });

    test("Debe de mostrar a Batman y el input con el valor del queryString", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman");
    });
    
    test("Debe de mostrar el mensaje 'No hay resultados' en el componente", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman778"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find(".alert-danger").exists()).toBe(true);
    });

    test("Debe de mostrar el navigate al cambiar los parametros", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change", {target: {
            name: "searchText",
            value: "batman"
        }});

        wrapper.find("form").prop("onSubmit")({
            preventDefault: () => {}
        });

        expect(mockNavigate).toHaveBeenCalledWith("?q=batman");

    });
    
});