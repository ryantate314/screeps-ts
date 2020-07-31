import { NewCreep } from "newCreep";
import { MyRoom } from "myRoom";

export abstract class RoomState {

    protected room: MyRoom;

    public constructor(room: MyRoom) {
        this.room = room;
    }

    public abstract spawnCreeps(): void;
}
