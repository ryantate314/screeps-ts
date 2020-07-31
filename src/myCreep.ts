import { RoleBase } from "creepRoles/roleBase";
import { MyRoom } from "myRoom";

export class MyCreep {
    role: RoleBase | null = null;
    creep: Creep;

    private _room: MyRoom | null = null;

    public set room(room: MyRoom | null) {
        this._room = room;
    }

    public get room(): MyRoom | null {
        return this._room;
    }

    public constructor(creep: Creep) {
        this.creep = creep;
    }

    public setRole(role: RoleBase) {
        this.role = role;
    }

    public execute(): void {
        if (this.role !== null) {
            this.role.action();
        }
    }

    public isFull(): boolean {
        return this.getEnergy() == this.getEnergyCapacity();
    }

    public getEnergy(): number {
        return this.creep.store[RESOURCE_ENERGY];
    }

    public getEnergyCapacity(): number {
        return this.creep.store.getCapacity(RESOURCE_ENERGY);
    }

    public moveTo(target: RoomPosition | { pos: RoomPosition }) {
        this.creep.moveTo(target);
    }

    public deposit(target: Structure): ScreepsReturnCode {
        return this.creep.transfer(target, RESOURCE_ENERGY);
    }
}
