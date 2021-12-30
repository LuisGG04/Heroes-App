import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ""} = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const {searchText} = formValues
    const heroFilter = useMemo(() => getHeroByName(q),[q]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    }

    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h3>Buscar</h3>
                    <hr />

                    <form onSubmit={handleSearch}>

                        <input type="text" placeholder="Buscar un héroe" className="form-control" name="searchText" autoComplete="off" value={searchText} onChange={handleInputChange}/>
                        <button className="btn btn-outline-primary mt-2" type="submit">Buscar</button>

                    </form>
                </div>

                <div className="col-7">
                    <h3>Resultados</h3>
                    <hr />

                    {(q === "") ? <div className="alert alert-info">Buscar un héroe</div> : (heroFilter.length === 0) && <div className="alert alert-danger">No hay resultados: {q}</div>}

                    {heroFilter.map(hero => (
                        <HeroCard 
                            key={hero.id}
                            {...hero}
                        />
                    ))}
                </div>
            </div>

        </>
    )
}
