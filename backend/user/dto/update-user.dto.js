import { UserRole } from '../enums/user.enum.js';

export function validateUpdateUserDto(data) {
    const errors = [];
    const updatedData = {};

  
    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push("El campo 'name' debe ser un texto válido.");
        } else {
            updatedData.name = data.name.trim();
        }
    }

    
    if (data.edad !== undefined) {
        if (typeof data.edad !== 'number' || data.edad <= 0) {
            errors.push("El campo 'edad' debe ser un número mayor a 0.");
        } else {
            updatedData.edad = data.edad;
        }
    }

  
    if (data.email !== undefined) {
        if (typeof data.email !== 'string' || !data.email.includes('@')) {
            errors.push("El campo 'email' debe ser un correo válido.");
        } else {
            updatedData.email = data.email.trim().toLowerCase();
        }
    }

   
    if (data.role !== undefined) {
        if (!Object.values(UserRole).includes(data.role)) {
            errors.push(`El campo 'role' debe ser uno de los permitidos: ${Object.values(UserRole).join(', ')}`);
        } else {
            updatedData.role = data.role;
        }
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return { isValid: true, data: updatedData };
}