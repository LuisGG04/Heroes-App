import { heroes } from "../data/heroes";

export const getHeroByPublished = (publisher) => {

    const validPublisher = ["DC Comics", "Marvel Comics"];

    if(!validPublisher.includes(publisher)){
        throw new Error(`${publisher} no es válido`);
    }

    return heroes.filter(heroe => heroe.publisher === publisher);
}