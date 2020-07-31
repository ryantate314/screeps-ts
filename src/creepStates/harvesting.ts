import { RoleState } from "./roleState";
import { Harvester } from "creepRoles/harvester";

export class Harvesting extends RoleState<Harvester> {
    public serialize(): string {
        return "harvesting";
    }

    public constructor(role: Harvester) {
        super(role);
    }

    public execute(): void {

        let spawnFull = this.role.creep.room?.spawnEnergyAvailable == this.role.creep.room?.spawnEnergyCapacity;
        let source = this.role.getEnergySource(spawnFull);
        if (source) {
            let result = source.extract(this.role.creep);
            if (result == ERR_NOT_IN_RANGE) {
                this.role.creep.moveTo(source.source);
            }
        }

        if (this.role.creep.isFull()) {
            this.role.setState(this.role.carrying);
        }
    }

}
