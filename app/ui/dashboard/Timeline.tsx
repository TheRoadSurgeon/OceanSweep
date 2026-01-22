"use client";

import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

interface Activity {
    type: string;
    description: string;
    createdAt: string;
    user: {
        userName: string;
        firstName: string;
        lastName: string;
    };
}

export default function Timeline() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    populateDatabase();
    useEffect(() => {
        fetch('/api/timeline')
            .then((res) => res.json())
            .then((data) => {
                setActivities(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);
    /*model content {
  id          Int         @id @default(autoincrement())
  description String
  createdby   Int?
  createddate DateTime?   @default(now()) @db.Timestamp(6)
  lastupdated DateTime?   @default(now()) @db.Timestamp(6)
  address     String
  city        String      @db.VarChar(255)
  statecode   String      @db.VarChar(5)
  zip         String      @db.VarChar(10)
  image       String?
  status      userstatus
  discardflag discardflag
  comments    comments[]
  users       users?      @relation(fields: [createdby], references: [id], onUpdate: NoAction)
  events      events[]
  post        post[]
}*/
    async function populateDatabase() {
        const prisma = new PrismaClient();
        try {
            // Create test content first
            const testContent = await prisma.content.create({
                data: {
                    description: "Beach Cleanup Documentation",
                    address: "123 Ocean Drive",
                    city: "Coastal City",
                    statecode: "CC",
                    zip: "12345",
                    status: "ACTIVE",
                    discardflag: "NO",
                    createdby: 1, // Assuming user ID 1 exists
                },
            });

            // Create test comments
            const testComments = await prisma.comments.createMany({
                data: [
                    {
                        description: "Great initiative!",
                        contentid: testContent.id,
                        createdby: 1,
                        status: "ACTIVE",
                        discardflag: "NO"
                    },
                    {
                        description: "When is the next event?",
                        contentid: testContent.id,
                        createdby: 2,
                        status: "ACTIVE",
                        discardflag: "NO"
                    }
                ],
            });

            // Create test feedback
            const testFeedback = await prisma.feedback.create({
                data: {
                    description: "Love the new activity timeline!",
                    createdby: 3,
                    status: "ACTIVE",
                    discardflag: "NO"
                },
            });

            console.log('Database populated with test data:', {
                content: testContent,
                comments: testComments,
                feedback: testFeedback
            });
        } catch (error) {
            console.error('An error occurred while populating the database:', error);
        } finally {
            await prisma.$disconnect();
        }
    }

    return (
        <div className="relative w-[536px] h-[863px] bg-[#84d6ff] rounded-[35px] shadow-[0px_4px_4px_#00000040]">
            <div className="absolute w-[541px] h-[66px] -top-px left-0 [font-family:'Inter-ExtraLight',Helvetica] font-extralight text-black text-4xl text-center tracking-[0] leading-[normal]">
                Recent Activity
            </div>

            <div className="absolute w-[491px] h-[695px] top-[84px] left-[22px] bg-[#acf1f9] rounded-[35px] overflow-y-auto p-4">
                {loading ? (
                    <div>Loading...</div>
                ) : activities.length === 0 ? (
                    <div className="text-black text-4xl text-center tracking-[0] leading-[normal]">No activities found</div>
                ) : (
                    activities.map((activity, index) => (
                        <div key={index} className="mb-4 p-3 bg-white rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-black text-center tracking-[0] leading-[normal]">
                  {activity.user.firstName} {activity.user.lastName}
                </span>
                                <span className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
                            </div>
                            <div className="text-gray-700">{activity.description}</div>
                            <div className="text-sm text-blue-600 capitalize">
                                {activity.type}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}