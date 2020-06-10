import React, {useState} from 'react';
import styled from 'styled-components'
import Location from "../types/location";
import {headingDistanceTo} from 'geolocation-utils'

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
        <LocationsElementContainer>
            <Total>Total distance: {getTotalDistance()} m</Total>
            {
                locations && locations.map((location, index) => {
                    const { timestamp, coords: { latitude, longitude } } = location
                    return (
                        <LocationElement key={timestamp}>
                            <p><span>{index + 1})</span> Date: {getPrettyDate(location)}</p>
                            <p>Lat: {latitude} - Long: {longitude}</p>
                        </LocationElement>
                        )

                })
            }
        </LocationsElementContainer>
    );
}

export default LocationsElement;

const LocationsElementContainer = styled.section`
  padding: 15px;
  
  p span {
    font-weight: bold;
    font-size: 22px;
  }
`;

const LocationElement = styled.div`
  margin-bottom: 12px;
`

const Total = styled.p`
  text-align: center;
  font-weight: bold;
`