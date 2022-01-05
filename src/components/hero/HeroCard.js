import React from "react";
import { Link } from "react-router-dom";

const heroImages = require.context("../../assets", true);

export const HeroCard = ({id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters}) => {

    // const imagePath = `/assets/${id}.jpg`

    return (
        <article className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={heroImages(`./${id}.jpg`)} className="card-img" alt={superhero}/>
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h3 className="card-title">{superhero}</h3>
                            <p className="card-text">{alter_ego}</p>

                            {(alter_ego !== characters) && 
                            <p className="text-muted">{characters}</p>}

                            <p className="card-text"><small className="text-muted">{first_appearance}</small></p>

                            <Link to={`/hero/${id}`}>Más información</Link> 
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
