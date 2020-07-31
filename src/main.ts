import { ErrorMapper } from "utils/ErrorMapper";
import { ScreepBuilder } from "screepBuilder";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  let builder = new ScreepBuilder();
  let built = builder.buildScreeps();

  for (let roomName in built.rooms) {
    console.log("Triggering room " + roomName);
    built.rooms[roomName].spawnCreeps();
  }

  for (let creep of built.creeps) {
    console.log("Triggering creep " + creep.creep.name);
    creep.execute();
  }
});
