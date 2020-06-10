import Location from "./location";

export default interface Route {
    id: string,
    timestamp: string,
    activity: string,
    locations: Location[]
}