export class NameManager {
    public generateRandomName(): string {
        return this.generateName("random");
    }

    public generateName(name: string): string {
        let suffix = 1;
        let newName = name + "1";
        while (newName in Game.creeps) {
            suffix++;
            newName = name + suffix;
        }
        return newName;
    }
}
