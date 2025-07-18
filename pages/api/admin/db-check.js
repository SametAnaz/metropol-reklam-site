import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/db";

export default async function handler(req, res) {
  // GET endpoint to check database and log status
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.isActive) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const results = {
      connection: false,
      tables: [],
      activityTable: false,
      userCount: 0,
      logCount: 0,
      testLogCreated: false,
    };

    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;
      results.connection = true;

      // List all tables
      const tables = await prisma.$queryRaw`SHOW TABLES`;
      results.tables = tables.map(t => Object.values(t)[0]);
      
      // Check activity_logs table
      results.activityTable = results.tables.includes('activity_logs');
      
      // Count users
      results.userCount = await prisma.user.count();
      
      if (results.activityTable) {
        // Count logs if table exists
        results.logCount = await prisma.activityLog.count();
        
        // Create a test log entry
        const testLog = await prisma.activityLog.create({
          data: {
            userId: parseInt(session.user.id),
            action: 'system_check',
            details: 'Database system check performed',
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
            userAgent: req.headers['user-agent'] || null
          }
        });
        
        if (testLog && testLog.id) {
          results.testLogCreated = true;
        }
      }
    } catch (dbError) {
      console.error("Database diagnostic error:", dbError);
      return res.status(200).json({
        ...results,
        error: dbError.message,
        stack: dbError.stack
      });
    }
    
    return res.status(200).json(results);
    
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
