import React, {useState} from 'react';
import styled from 'styled-components'
import data from '../data/data.json'
import Route from "../types/Route";
import RouteRow from "../ui/RouteRow";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

function Home() {
    const [roadsData] = useState<Route[]>(data.routes)

    return (
        <HomeContainer>
            <TableContainer component={Paper}>
                <Table aria-label="roads table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Roads</TableCell>
                            <TableCell align="right">Activity</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            roadsData && roadsData.map((road: Route, index: number) => {
                                return (
                                    <RouteRow key={road.id} index={index} route={road} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </HomeContainer>
    );
}

export default Home;

const HomeContainer = styled.section`
  width: 700px;
  max-width: 100%;
  margin: 0 auto;
`;
