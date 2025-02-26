const { MemoryRouter } = require("react-router-dom")
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");
const { render, screen, fireEvent } = require("@testing-library/react");


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage/>', () => {

    beforeEach(() => jest.clearAllMocks());


    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        // Podríamos usar data ficticia
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        // screen.debug();

        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');

    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'superman';

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });

});