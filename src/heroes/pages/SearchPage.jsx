import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';


export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q); // Paso el valor del query que recibo por parámetro

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  /* El valor del hook tiene que coincidir con el name del input */
  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  }

  return (
    <>

      <h1>SearchPage</h1>
      <hr />

      <div className="row">

        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Result</h4>
          <hr />

          <div className="alert alert-primary animate__animated animate__fadeIn" style={{ display: showSearch ? '' : 'none' }}>
            Search a Hero
          </div>

          <div aria-label="alert-danger" className="alert alert-danger animate__animated animate__fadeIn" style={{ display: showError ? '' : 'none' }}>
            No hero with <b>{q}</b>
          </div>




          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }


        </div>

      </div>

    </>
  )
}
