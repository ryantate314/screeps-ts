import { BodyPartSorter } from "bodyPartSorter";
import { NewCreep } from "newCreep";
import { NameManager } from "nameManager";

export class CreepBuilder {

    private body: BodyPartConstant[];
    private _sorter: BodyPartSorter;
    private name: string | null;
    private nameManager: NameManager;

    public constructor() {
        this.body = [];
        this._sorter = new BodyPartSorter();
        this.name = null;
        this.nameManager = new NameManager();
        this._sorter = new BodyPartSorter();
    }

    public set sorter(sorter: BodyPartSorter) {
        this._sorter = sorter;
    }

    public constructBalancedCreep(energy?: number): CreepBuilder {
        return this.addSegment([WORK, CARRY, MOVE], energy);
    }

    public addBodyPart(part: BodyPartConstant): CreepBuilder {
        this.body.push(part);
        return this;
    }

    /**
     *
     * @param segment
     * @param energy Optional. Add the number of segments to use up the provided energy.
     */
    public addSegment(segment: BodyPartConstant[], energy?: number): CreepBuilder {

        let numSegments = 1;

        if (energy !== undefined) {
            let segmentCost = this.getSegmentCost(segment);
            numSegments = Math.floor(energy / segmentCost);
        }

        for (let i = 0; i < numSegments; i++) {
            for (let part of segment) {
                this.addBodyPart(part);
            }
        }

        return this;
    }

    public setName(name: string): CreepBuilder {
        this.name = name;
        return this;
    }

    public getCost(): number {
        return this.getSegmentCost(this.body);
    }

    private getSegmentCost(segment: BodyPartConstant[]): number {
        return _.sum(this.body.map(x => this.getPartCost(x)));
    }

    private getPartCost(part: BodyPartConstant): number {
        let cost = 50;
        switch (part) {
            case WORK:
                cost = 100;
                break;
            case ATTACK:
                cost = 80;
                break;
            case RANGED_ATTACK:
                cost = 150;
                break;
            case HEAL:
                cost = 250;
                break;
            case CLAIM:
                cost = 600;
                break;
            case TOUGH:
                cost = 10;
                break;
        }
        return cost;
    }

    public build(): NewCreep {
        let creep = new NewCreep();
        creep.body = this._sorter.sort(this.body);

        if (this.name !== null) {
            creep.name = this.nameManager.generateName(this.name);
        }
        else {
            creep.name = this.nameManager.generateRandomName();
        }

        return creep;
    }


}
