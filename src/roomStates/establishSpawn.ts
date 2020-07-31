import { RoomState } from "./roomState";
import { NewCreep } from "newCreep";
import { MyRoom } from "myRoom";
import { CreepBuilder } from "CreepBuilder";
import { RoleEnum } from "creepRoles/roleEnum";

export class EstablishSpawn extends RoomState {

    public constructor(room: MyRoom) {
        super(room);
    }

    public spawnCreeps(): void {
        let creep = null;

        let builder = new CreepBuilder();
        if (this.room.countCreeps(RoleEnum.Harvester) < 3) {
            creep = builder.constructBalancedCreep()
                .setName(RoleEnum.Harvester.name)
                .build();
        }

        if (creep !== null) {
            this.room.getSpawns()[0].spawnCreep(creep.body, creep.name, {
                memory: {
                    role: RoleEnum.Harvester.name,
                    homeRoom: this.room.name,
                    state: null
                }
            });
        }
    }

}
