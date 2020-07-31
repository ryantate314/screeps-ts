import { RoleState } from "creepStates/roleState";
import { RoleBase } from "../creepRoles/roleBase";
import { Harvester } from "../creepRoles/harvester";

export class Carrying extends RoleState<Harvester> {

    public constructor(role: Harvester) {
        super(role);
    }

    public execute(): void {

        let target = this.role.getTarget();
        if (target !== null) {
            let result = this.role.creep.deposit(target);
            if (result == ERR_NOT_IN_RANGE) {
                this.role.creep.moveTo(target);
            }
        }

        if (this.role.creep.getEnergy() == 0) {
            this.role.setState(this.role.harvesting);
        }
    }

    public serialize(): string {
        return "carrying";
    }

}
