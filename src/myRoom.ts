import { RoomState } from "roomStates/roomState";
import { EstablishSpawn } from "roomStates/establishSpawn";
import { RoleEnum } from "creepRoles/roleEnum";

export class MyRoom {

    private _establishSpawn: RoomState;

    public get establishSpawn(): RoomState { return this._establishSpawn; }


    name: string;
    state: RoomState | null = null;

    public constructor(name: string) {
        this.name = name;

        this._establishSpawn = new EstablishSpawn(this);
    }

    public setState(state: RoomState): void {
        this.state = state;
    }

    public spawnCreeps(): void {
        this.state?.spawnCreeps();
    }

    public moveCreeps(): void {

    }

    private get creeps(): Creep[] {
        return _.filter(Game.creeps, x => x.memory.homeRoom == this.name);
    }

    private get room(): Room {
        return Game.rooms[this.name];
    }

    public countCreeps(role: RoleEnum): number {
        return _.filter(this.creeps, x => x.memory.role == role.name).length;
    }

    public getSpawns(): StructureSpawn[] {
        return this.room.find(FIND_MY_SPAWNS);
    }

    /**
     * Get the total capacity of spawns and extensions.
     */
    public get spawnEnergyCapacity(): number {
        return this.room.energyCapacityAvailable;
    }

    /**
     * Get the energy currently stored in spawns and extensions.
     */
    public get spawnEnergyAvailable(): number {
        return this.room.energyAvailable;
    }

    /**
     * Count the total energy in storage in the current room.
     */
    public get energyStored(): number {
        let storage = this.room.find(FIND_STRUCTURES, {
            filter: x => x.structureType == STRUCTURE_CONTAINER
                || x.structureType == STRUCTURE_STORAGE
        }) as (StructureStorage | StructureContainer)[];

        return _.sum(_.map(storage, x => x.store[RESOURCE_ENERGY]));
    }

    public countRoles() {
        let grouped = _.groupBy(this.creeps, x => x.memory.role);
        let counts: Record<string, number> = {};
        for (let role in grouped) {
            counts[role] = grouped[role].length;
        }
        return counts;
    }

}
