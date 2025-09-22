"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Headphones, PenTool, BookOpen as ReadingIcon } from "lucide-react";

interface SkillTypeTabsProps {
    activeSkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';
    onSkillTypeChange: (skillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading') => void;
}

const skillTypes = [
    { value: 'Speaking', label: 'Speaking', icon: Mic, color: 'text-blue-600' },
    { value: 'Listening', label: 'Listening', icon: Headphones, color: 'text-green-600' },
    { value: 'Writing', label: 'Writing', icon: PenTool, color: 'text-purple-600' },
    { value: 'Reading', label: 'Reading', icon: ReadingIcon, color: 'text-orange-600' },
];

export default function SkillTypeTabs({ activeSkillType, onSkillTypeChange }: SkillTypeTabsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D2B48C]/30"
        >
            <Tabs value={activeSkillType} onValueChange={onSkillTypeChange}>
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
