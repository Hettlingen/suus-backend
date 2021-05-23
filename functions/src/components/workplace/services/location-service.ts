import {Address} from "../../identity-access-management/partner/model/address";
import {Client} from "@googlemaps/google-maps-services-js";
import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";

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

    static async getAllProducersWithinRadius(listRoleProducers: RoleProducer[], latitudeOfCenter: number, longitudeOfCenter: number, radiusInKm: number): Promise<RoleProducer[]> {
        console.log('START: LocationService.getAllProducersWithinRadius');
        // const center = {latitude: latitudeOfCenter, longitude: longitudeOfCenter};

        const googleMapsService = new Client({});

        googleMapsService
            .elevation({
                params: {
                    locations: [{ lat: 45, lng: -110 }],
                    key: "asdf",
                },
                timeout: 1000, // milliseconds
            })
            .then((r) => {
                console.log(r.data.results[0].elevation);
            })
            .catch((e) => {
                console.log(e.response.data.error_message);
            });

        return [];
    }
}
