import { Estado } from './user.enum';

export class UserDto {
    id: number;
    name: string;
    apellido: string;
    edad: number;
    email: string;
    estado: Estado;

    constructor(u: any) {
        this.id = u.id;
        this.name = u.name;
        this.apellido = u.apellido;
        this.edad = u.edad;
        this.estado = u.estado;


        console.log("DTO procesando email l:", u.email);
        this.email = this.maskEmail(u.email);
    }

    private maskEmail(email: string): string {
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return 'correo@desconocido.com';
        }
        
        const parts = email.split('@');
        const username = parts[0];
        const domain = parts[1];

        if (username.length <= 2) {
            return `${username[0]}*@${domain}`;
        }

        const masked = username.substring(0, 2) + '*'.repeat(username.length - 2);
        return `${masked}@${domain}`;
    }
}