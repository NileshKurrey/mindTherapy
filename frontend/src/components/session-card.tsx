import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {Timer,ChartLine}from  'lucide-react'
type badge = "neutral" | "positive" | "negative";

interface SessionCardProps {
    name: string;
    date: string;
    time: string;
    description: string;
    mood: string;
    badge: badge;
}

const moodBadgeMap: Record<badge, { label: string; color: string }> = {
    neutral: { label: "Neutral", color: "bg-gray-300 text-gray-800" },
    positive: { label: "Positive", color: "bg-green-200 text-green-800" },
    negative: { label: "Negative", color: "bg-red-200 text-red-800" },
};

const SessionCard: React.FC<SessionCardProps> = ({
    name,
    date,
    time,
    description,
    mood,
    badge,
}) => {
    return ( 
        <Card className="w-full bg-white rounded-lg shadow flex flex-col sm:flex-row overflow-hidden">
            <CardContent className="sm:w-[90%] w-[100%] flex flex-col sm:flex-row items-start justify-between p-3">
                <div className="pl-4">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-md text-balance text-gray-500 mb-1">{date} • {time}</p>
                    <p className="text-gray-700 text-sm text-">{description}</p>
                    <div className="flex items-center justify-start gap-4 mt-2 ">
                        <p className="flex items-center text-gray-500 text-md">
                            <Timer className="mr-1 text-sm" />
                            22 minutes
                        </p>
                        <p className="flex items-center text-gray-500 text-md">
                            <ChartLine className="mr-1 text-sm" />
                            {mood}</p>
                    </div>
                </div>
            </CardContent>
            <CardContent className="w-[50%] flex flex-col items-end justify-between p-4">
                <Badge className={cn("px-3 py-1 rounded-full", moodBadgeMap[badge].color)}>
                    {moodBadgeMap[badge].label}
                </Badge>


                   <Link to="/home/sessions" className="mt-2">
                       <span className="text-red-500 hover:underline cursor-pointer">
                           See Report
                       </span>
                   </Link>

            </CardContent>
        </Card>
    );
};

export default SessionCard;