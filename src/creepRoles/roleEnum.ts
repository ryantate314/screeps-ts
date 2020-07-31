export class RoleEnum {
    private _name: string;

    public get name(): string {
        return this._name;
    }

    private constructor(name: string) {
        this._name = name;
    }

    public static readonly Harvester = new RoleEnum("harvester");
}
