import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe("Pruebas en el componente HeroScreen", () => {

    test("No debe de mostrar el HeroScreen si no se tiene algún héroe como parámetro", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find("h1").text().trim()).toBe("No hero page");
    });

    test("Debe de mostrar un héroe si el parámetro existe y se encuentra", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".row").exists()).toBe(true);
    });

    test("Debe de regresar a la pantalla anterior", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
    
});
