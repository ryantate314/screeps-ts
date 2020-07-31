import { EnergySource } from "./energySource";
import { MyCreep } from "myCreep";

export class Storage extends EnergySource {
    public extract(creep: MyCreep): ScreepsReturnCode {
        return creep.creep.withdraw(<Structure>this.source, RESOURCE_ENERGY);
    }

}
