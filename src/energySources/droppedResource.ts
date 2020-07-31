import { EnergySource } from "./energySource";
import { MyCreep } from "myCreep";

export class DroppedResource extends EnergySource {
    public extract(creep: MyCreep): ScreepsReturnCode {
        return creep.creep.pickup(<Resource>this.source);
    }

}
