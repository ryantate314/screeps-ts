import { MyCreep } from "myCreep";
import { RoleState } from "creepStates/roleState";

export abstract class RoleBase {

    public creep: MyCreep;


    public constructor(creep: MyCreep) {
        this.creep = creep;
    }

    public abstract action(): void;

}
