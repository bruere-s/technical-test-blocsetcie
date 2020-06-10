import React, {useState} from 'react';
import styled from 'styled-components'
import Route from "../types/Route";
import {Modal} from "@material-ui/core";
import LocationsElement from "./LocationsElement";

interface IProps {
    index: number,
  route: Route
}

function RouteElement(props: IProps) {
    const { index, route, route: {locations} } = props
    const [modalOpen, setModelOpen] = useState(false)

    const getPrettyDate = () => {
        const { timestamp } = route
        const date = new Date(timestamp)

        return (
            new Intl.DateTimeFormat('en-US',
                {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}
                ).format(date)
        )
    }

    const getPrettyActivity = () => {
        const { activity } = route

        switch (activity) {
            case "in_vehicle":
                return "Vehicule"
            default:
                return ""
        }
    }

    return (
        <RouteElementContainer>
            <p><span>{index + 1})</span> made in: {getPrettyActivity()}</p>
            <p>Date: {getPrettyDate()}</p>

            <button type="button" onClick={() => {setModelOpen(true)}}>
                View list
            </button>
            <Modal
                open={modalOpen}
                onClose={() => {setModelOpen(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <BodyModal>
                    <LocationsElement locations={locations} />
                </BodyModal>
            </Modal>
        </RouteElementContainer>
    );
}

export default RouteElement;

const RouteElementContainer = styled.section`
  padding: 10px;
  
  p span {
    font-weight: bold;
    font-size: 22px;
  }
`;

const BodyModal = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 60%;
    height: 60%;
    overflow-y: scroll;
    background-color: white;
`;


