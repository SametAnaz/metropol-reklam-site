import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Initialize Firebase Admin
// Note: You need to provide your Firebase service account credentials
const serviceAccount = require('../path-to-your-firebase-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function migrateUsers() {
  try {
    // Get all users from Firebase
    const listUsersResult = await admin.auth().listUsers();
    const firebaseUsers = listUsersResult.users;

    console.log(`Found ${firebaseUsers.length} users to migrate`);

    for (const firebaseUser of firebaseUsers) {
      try {
        // Generate a secure random password for the user
        // They will need to reset their password on first login
        const temporaryPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(temporaryPassword, 12);

        const user = await prisma.user.upsert({
          where: {
            email: firebaseUser.email,
          },
          update: {
            email: firebaseUser.email,
            name: firebaseUser.displayName || null,
            image: firebaseUser.photoURL || null,
            emailVerified: firebaseUser.emailVerified ? new Date() : null,
            password: hashedPassword,
          },
          create: {
            email: firebaseUser.email,
            name: firebaseUser.displayName || null,
            image: firebaseUser.photoURL || null,
            emailVerified: firebaseUser.emailVerified ? new Date() : null,
            password: hashedPassword,
          },
        });

        console.log(`Migrated user: ${user.email}`);
        
        // TODO: Send email to user with their temporary password
        console.log(`Temporary password for ${user.email}: ${temporaryPassword}`);
      } catch (error) {
        console.error(`Failed to migrate user ${firebaseUser.email}:`, error);
      }
    }

    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateUsers();
