import {Address} from "../../identity-access-management/partner/model/address";

export class LocationService {

    public async getAddressesWithinRadius(latitudeOfCenter: number, longitudeOfCenter: number, addresses: Address[], radiusInKm: number): Promise<Address[]> {
        console.log('START: LocationService.getTermsOfUse');
        const center = new google.maps.LatLng(latitudeOfCenter, longitudeOfCenter);

        const filteredAddressesWithinRadius = addresses.filter(address => {
            const markerLoc = new google.maps.LatLng(address.latitude, address.longitude);
            const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;

            if (distanceInKm < radiusInKm) {
                return address;
            }
            return null;
        });

        return filteredAddressesWithinRadius;
    }

    // static async getAllProducersWithinRadius(
    //     listRoleProducers: RoleProducer[],
    //     centerLocation: LatLng,
    //     radiusInKm: number): Promise<RoleProducer[]> {
    //
    //     console.log('START: LocationService.getAllProducersWithinRadius');
    //     const googleMapsService = new Client({});
    //     const destinations = [47.5080623, 8.7571073];
    //     const request = {
    //         origins: centerLocation,
    //         destinations: [destinations],
    //         travelMode: TravelMode.driving,
    //     };
    //
    //     googleMapsService.distancematrix(request)
    //         .then((r) => {
    //             console.log('Distanz ist: ');
    //         })
    //         .catch((e) => {
    //             console.log('Fehler beim berechnen der Distanz');
    //         });;
    //
    //     return [];
    // }
}
