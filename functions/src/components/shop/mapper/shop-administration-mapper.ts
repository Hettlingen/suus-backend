import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";

export const mapProducerFromDbToProducer = (producerFromDb: any) => {
    const roleProducer = new RoleProducer();

    roleProducer.uuid = producerFromDb[0].uuid;
    roleProducer.numberCompany = producerFromDb[0].numberCompany;
    roleProducer.description = producerFromDb[0].description;

    return roleProducer;
}
