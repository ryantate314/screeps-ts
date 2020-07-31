import { MyCreep } from "myCreep";
import { MyRoom } from "myRoom";
import { Harvester } from "creepRoles/harvester";
import { Harvesting } from "creepStates/harvesting";
import { RoleBase } from "creepRoles/roleBase";
import { EstablishSpawn } from "roomStates/establishSpawn";
import { RoleEnum } from "creepRoles/roleEnum";

export class ScreepBuilder {
    public buildScreeps(): { rooms: Record<string, MyRoom>, creeps: MyCreep[] } {
        let creeps = [];
        let rooms: Record<string, MyRoom> = {};

        //Build rooms first
        for (let spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName];
            if (!(spawn.room.name in rooms)) {
                rooms[spawn.room.name] = this.buildRoom(spawn.room);
            }
        }

        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];

            let myCreep = new MyCreep(creep);

            let role = this.buildRole(myCreep);
            if (role == null)
                continue;

            myCreep.setRole(role);

            if (!(creep.room.name in rooms)) {
                rooms[creep.room.name] = this.buildRoom(creep.room);
            }

            myCreep.room = rooms[creep.room.name];

            creeps.push(myCreep);
        }

        return {
            rooms: rooms,
            creeps: creeps
        };
    }

    private buildRoom(room: Room): MyRoom {
        let myRoom = new MyRoom(room.name);
        myRoom.setState(myRoom.establishSpawn);
        return myRoom;
    }

    private buildRole(myCreep: MyCreep): RoleBase | null {
        let role = null;
        switch (myCreep.creep.memory.role) {
            case RoleEnum.Harvester.name:
                role = new Harvester(myCreep);
                switch (myCreep.creep.memory.state) {
                    case "harvesting":
                        role.setState(role.harvesting);
                        break;
                    case "carrying":
                        role.setState(role.carrying);
                        break;
                    default:
                        role.setState(role.defaultState);
                        break;
                }
                break;
            default:
                break;
        }
        return role;
    }
}
