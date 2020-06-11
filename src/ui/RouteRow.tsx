import React, {useState} from 'react';
import styled from 'styled-components'
import Route from "../types/Route";
import {Modal, TableCell, TableRow} from "@material-ui/core";
import LocationsElement from "./LocationsElement";
import DriveEtaIcon from '@material-ui/icons/DriveEta';

interface IProps {
    index: number,
    route: Route
}

function RouteRow(props: IProps) {
    const { index, route, route: {locations, id} } = props
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
                return <DriveEtaIcon />
            default:
                return ""
        }
    }

    return (
        <>
            <CustomTableRow key={id} onClick={() => {setModelOpen(true)}}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell align="right">{getPrettyActivity()}</TableCell>
                <TableCell align="right">{getPrettyDate()}</TableCell>
            </CustomTableRow>
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
        </>
    );
}

export default RouteRow;

const CustomTableRow = styled(TableRow)`
  &:hover {
    background-color: #cecece;
    cursor: pointer;
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


