import React, {useState} from 'react';
import styled from 'styled-components'
import data from '../data/data.json'
import Route from "../types/Route";
import RouteElement from "../ui/RouteElement";

function Home() {
    const [roadsData] = useState<Route[]>(data.routes)

    return (
        <HomeContainer>
            {
                roadsData && roadsData.map((road: Route, index: number) => {
                    return (
                        <RouteElement key={road.id} index={index} route={road} />
                        )
                })
            }
        </HomeContainer>
    );
}

export default Home;

const HomeContainer = styled.section`
  padding: 10px;
`;
