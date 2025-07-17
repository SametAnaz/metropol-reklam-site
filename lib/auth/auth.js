import { getUserByEmail, createUser, getUserByUid } from '../db';
import bcrypt from 'bcryptjs';

// User roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

/**
 * Register a new user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
 */
export const registerUser = async (email, password) => {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await createUser({
      email,
      password: hashedPassword,
      role: USER_ROLES.USER
    });

    return {
      success: true,
      user: {
        ...user,
        password: undefined // Don't send password back to client
      }
    };
  } catch (error) {
    console.error('User registration error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Login a user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
 */
export const loginUser = async (email, password) => {
  try {
    // Get user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, error: 'Invalid credentials' };
    }

    return {
      success: true,
      user: {
        ...user,
        password: undefined // Don't send password back to client
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's role
 * @param {string} email 
 * @returns {Promise<string|null>}
 */
export const getUserRole = async (email) => {
  try {
    const user = await getUserByEmail(email);
    return user?.role || null;
  } catch (error) {
    console.error('Role check error:', error);
    return null;
  }
};

/**
 * Check if user is an admin
 * @param {string} email 
 * @returns {Promise<boolean>}
 */
export const isAdmin = async (email) => {
  try {
    const user = await getUserByEmail(email);
    return user?.isActive || false;  // isActive olan kullanıcılar admin olarak kabul edilir
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
};

/**
 * Geçiş dönemi için kullanılan rol kontrolü - isActive değeri admin olarak kabul edilir
 * @param {string} email 
 * @returns {Promise<string|null>}
 */
export const getUserRoleMigration = async (email) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) return null;
    
    return user.isActive ? USER_ROLES.ADMIN : USER_ROLES.USER;
  } catch (error) {
    console.error('Role migration check error:', error);
    return null;
  }
};
