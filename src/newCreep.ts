export class NewCreep {
    private _name: string = "";
    private _body: BodyPartConstant[] = [];

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get body(): BodyPartConstant[] {
        return this._body;
    }

    public set body(value: BodyPartConstant[]) {
        this._body = value;
    }
}
