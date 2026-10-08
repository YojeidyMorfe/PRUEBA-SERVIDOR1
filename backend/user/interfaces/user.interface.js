import { UserRole } from '../enums/user.enum.js';

/**
 * @typedef {Object} IUser
 * @property {number} id 
 * @property {string} name 
 * @property {string} email 
 * @property {number} edad
 * @property {string} role 
 * @property {boolean} isActive 
 */

export function createUserInterface(data) {
    return {
        id: data.id,
        name: data.name,
        edad: data.edad,
        email: data.email ?? "sin-email@registrado.com", 
        role: data.role ?? "USER",
        isActive: data.isActive ?? true
    };
}