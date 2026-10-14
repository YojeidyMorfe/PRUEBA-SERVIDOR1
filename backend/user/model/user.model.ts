import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 100,
        },
        edad: {
            type: "int",
        },
        email: {
            type: "varchar",
            length: 100,
            nullable: true,
        },
        role: {
            type: "varchar",
            length: 20,
            default: "USER",
            nullable: true
        }
    },
});

export default User;