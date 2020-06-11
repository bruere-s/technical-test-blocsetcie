import React from 'react';
import styled from 'styled-components'
import Location from "../types/location";
import {headingDistanceTo} from 'geolocation-utils'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

interface IProps {
    locations: Location[]
}

function LocationsElement(props: IProps) {
    const { locations } = props

    const getPrettyDate = (location: Location) => {
        const { timestamp } = location
        const date = new Date(timestamp)

        return (
            new Intl.DateTimeFormat('en-US',
                {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}
            ).format(date)
        )
    }

    const getTotalDistance = () => {
        let totalMeters = 0;

        for (let i = 0; i < locations.length; i++) {
            if (i + 1 === locations.length) break;

            const { coords: { latitude: lat1, longitude: long1 } } = locations[i]
            const { coords: { latitude: lat2, longitude: long2 } } = locations[i + 1]

            const res = headingDistanceTo(
                {lat: lat1, lon: long1},
                {lat: lat2, lon: long2})

            totalMeters += res.distance
        }

        return totalMeters.toFixed(2)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Total>Total distance: {getTotalDistance()} m</Total>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell align="right">Latitude</TableCell>
                            <TableCell align="right">Longitude</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            locations && locations.map((location, index) => {
                                const { timestamp, coords: { latitude, longitude } } = location

                                return (
                                    <TableRow key={timestamp}>
                                        <TableCell component="th" scope="row" size="small">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{latitude}</TableCell>
                                        <TableCell align="right">{longitude}</TableCell>
                                        <TableCell align="right">{getPrettyDate(location)}</TableCell>
                                    </TableRow>
                                )})
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default LocationsElement;

const Total = styled.p`
font-family: 'Roboto',serif;
text-align: center;
font-weight: bold;
`