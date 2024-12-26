import { HeroCard } from './';
import { getHeroesByPublisher } from '../helpers';
import { useMemo } from 'react';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo ( () => getHeroesByPublisher(publisher), [publisher]); // Cuando cambie el publisher, se redispara

    return (
        <ul className="row rows-cols-1 row-cols-md-3 g-3">
            {
                heroes.map(hero => (
                    // <li key={ hero.id}>
                    //     {hero.superhero}
                    // </li>
                    <HeroCard
                        key={hero.id}
                        {...hero}
                    />
                ))
            }
        </ul>
    )
}

