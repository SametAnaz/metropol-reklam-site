import { PrismaClient } from './generated/prisma';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

/**
 * Create a new user
 * @param {Object} data - User data including email, password, and role
 * @returns {Promise<Object>} Created user object
 */
export const createUser = async (data) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get a user by email
 * @param {string} email 
 * @returns {Promise<Object|null>}
 */
export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
};

/**
 * Update a user
 * @param {string} id 
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
export const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a user
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: error.message };
  }
};
