import { MyCreep } from "myCreep";

export class EnergySource {
    public source: Structure | Resource | Source;
    public extract(creep: MyCreep): ScreepsReturnCode {
        return creep.creep.harvest(<Source>this.source);
    }

    public constructor(source: Structure | Resource | Source) {

        this.source = source;
    }

}
