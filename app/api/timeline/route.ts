import { PrismaClient } from '@prisma/client';
import { users } from '@prisma/client';

const prisma = new PrismaClient();

interface Activity {
    type: string;
    description: string;
    createdAt: Date;
    user: {
        userName: string;
        firstName: string;
        lastName: string;
    };
}

export async function GET() {
    try {
        const [comments, content, feedback] = await Promise.all([
            prisma.comments.findMany({
                where: {
                    status: 'ACTIVE',
                    discardflag: 'NO',
                    users: { discardflag: 'NO' }
                },
                include: { users: true },
                orderBy: { createddate: 'desc' },
                take: 10,
            }),
            prisma.content.findMany({
                where: {
                    status: 'ACTIVE',
                    discardflag: 'NO',
                    users: { discardflag: 'NO' }
                },
                include: { users: true },
                orderBy: { createddate: 'desc' },
                take: 10,
            }),
            prisma.feedback.findMany({
                where: {
                    status: 'ACTIVE',
                    discardflag: 'NO',
                    users: { discardflag: 'NO' }
                },
                include: { users: true },
                orderBy: { createddate: 'desc' },
                take: 10,
            }),
        ]);

        const mapUser = (
            user: Pick<users, 'username' | 'firstname' | 'lastname'> | null
        ) => ({
            userName: user?.username || 'Unknown',
            firstName: user?.firstname || 'User',
            lastName: user?.lastname || '',
        });

        const activities: Activity[] = [
            ...comments.map(comment => ({
                type: 'comment',
                description: comment.description,
                createdAt: comment.createddate || new Date(),
                user: mapUser(comment.users)
            })),
            ...content.map(c => ({
                type: 'content',
                description: c.description,
                createdAt: c.createddate || new Date(),
                user: mapUser(c.users)
            })),
            ...feedback.map(f => ({
                type: 'feedback',
                description: f.description,
                createdAt: f.createddate || new Date(),
                user: mapUser(f.users)
            })),
        ];

        // Sort by date and get top 10
        const sortedActivities = activities
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 10);
        return Response.json(sortedActivities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        return Response.json(
            { error: 'Failed to load activities' },
            { status: 500 }
        );
    }
}

// Optional: Add other HTTP methods if needed
export async function POST() {
    return Response.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}