// This script activates all existing admin users
// Sets isActive=true for existing accounts

const { PrismaClient } = require('../lib/generated/prisma');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  try {
    // Get all users
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to update`);

    // Update each user - activate all existing users
    for (const user of users) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          isActive: true  // Activate all existing users
        }
      });
      console.log(`Updated user ${user.email}: isActive=true`);
    }

    console.log('All users updated successfully');
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
