import { RoleBase } from "creepRoles/roleBase";

export abstract class RoleState<T extends RoleBase> {

    protected role: T;

    public constructor(role: T) {
        this.role = role;
    }

    public abstract execute(): void;

    public abstract serialize(): string;
}
