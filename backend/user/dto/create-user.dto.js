import { UserRole } from '../enums/user.enum.js'; 

export function validateCreateUserDto(data) { 
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        errors.push("El campo 'name' es obligatorio y debe ser un texto.");
    }

    if (data.edad === undefined || typeof data.edad !== 'number' || data.edad <= 0) {
        errors.push("El campo 'edad' es obligatorio y debe ser un número mayor a 0.");
    }

    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
        errors.push("El campo 'email' es obligatorio y debe ser un correo válido.");
    }

    const role = Object.values(UserRole).includes(data.role) ? data.role : UserRole.USER;

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        data: {
            name: data.name.trim(),
            edad: data.edad,
            email: data.email.trim().toLowerCase(),
            role: role
        }
    };
}