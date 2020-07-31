import { RoleBase } from "./roleBase";
import { Harvesting } from "creepStates/harvesting";
import { MyCreep } from "myCreep";
import { Carrying } from "../creepStates/carrying";
import { RoleState } from "creepStates/roleState";
import { EnergySource } from "energySources/energySource";
import { DroppedResource } from "energySources/droppedResource";
import { Storage } from "energySources/storage";

export class Harvester extends RoleBase {

    private _harvesting: Harvesting;
    private _carrying: Carrying;

    protected state: RoleState<Harvester> | null = null;

    public get defaultState(): RoleState<Harvester> {
        return this._harvesting;
    }

    public constructor(creep: MyCreep) {
        super(creep);

        this._carrying = new Carrying(this);
        this._harvesting = new Harvesting(this);
    }

    public get harvesting() {
        return this._harvesting;
    }

    public get carrying() {
        return this._carrying;;
    }

    public action() {
        this.state?.execute();
    }

    public setState(state: RoleState<Harvester>): void {
        this.state = state;
        this.creep.creep.memory.state = this.state.serialize();
    }

    public getEnergySource(ignoreStorage: boolean = false): EnergySource | null {

        let energySource = null;

        let droppedEnergy = this.creep.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: x => x.resourceType == RESOURCE_ENERGY
                && this.creep.creep.pos.getRangeTo(x) < 10
        });
        if (droppedEnergy != null) {
            energySource = new DroppedResource(droppedEnergy);
        }
        else {
            let storage = this.creep.creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: x => (x.structureType == STRUCTURE_CONTAINER
                    || (!ignoreStorage && x.structureType == STRUCTURE_STORAGE))
                    && x.store[RESOURCE_ENERGY] > 0

            });
            if (storage != null) {
                energySource = new Storage(storage);
            }
            else {
                let source = this.creep.creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: x => x.energy > 0
                });
                if (source != null) {
                    return new EnergySource(source);
                }
            }
        }

        return energySource;
    }

    public getTarget(): Structure | null {
        let target = null;

        if (this.creep.room === null)
            throw ("Missing a room");

        //Prioritize spawning if less than half full
        if (this.creep.room.spawnEnergyAvailable < this.creep.room.spawnEnergyCapacity / 2) {
            target = this.creep.creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: x => x.structureType == STRUCTURE_SPAWN
                    || x.structureType == STRUCTURE_EXTENSION
            });
        }
        else {
            target = this.creep.creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: x => x.structureType == STRUCTURE_SPAWN
                    || x.structureType == STRUCTURE_EXTENSION
                    || x.structureType == STRUCTURE_TOWER
                    || x.structureType == STRUCTURE_STORAGE
            });
        }

        return target;
    }

}
