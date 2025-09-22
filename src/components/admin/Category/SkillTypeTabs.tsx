"use client";

import { motion } from "framer-motion";
import { Mic, Headphones, PenTool, BookOpen as ReadingIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const skillTypes = [
    { value: 'Speaking', label: 'Speaking', icon: Mic, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'Listening', label: 'Listening', icon: Headphones, color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'Writing', label: 'Writing', icon: PenTool, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'Reading', label: 'Reading', icon: ReadingIcon, color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

interface SkillTypeTabsProps {
    activeSkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';
    onSkillTypeChange: (value: 'Speaking' | 'Listening' | 'Writing' | 'Reading') => void;
}

export default function SkillTypeTabs({ activeSkillType, onSkillTypeChange }: SkillTypeTabsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D2B48C]/30"
        >
            <Tabs value={activeSkillType} onValueChange={(value) => onSkillTypeChange(value as 'Speaking' | 'Listening' | 'Writing' | 'Reading')}>
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-[#F5F3EA] border border-[#D2B48C] h-auto">
                    {skillTypes.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <TabsTrigger
                                key={skill.value}
                                value={skill.value}
                                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-[#8B4513] data-[state=active]:bg-[#8B4513] data-[state=active]:text-white p-2 sm:p-3 font-calistoga-regular"
                            >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-medium text-xs sm:text-sm">{skill.label}</span>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        </motion.div>
    );
}
