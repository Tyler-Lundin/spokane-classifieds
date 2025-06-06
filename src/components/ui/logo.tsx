"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


export default function Logo({ className, width = 200, height = 200 }: { className?: string, width?: number, height?: number }) {
    return (
                <Link href="/" className={cn("flex items-center -my-2 mx-auto w-fit", className)}>
                    <div className={cn(
                        `w-[${width}px] h-[${height}px]`,
                        "bg-black rounded-full"
                    )} />
                    <Image src="/images/logo.webp" alt="Logo" width={width} height={height} className="grayscale dark:invert"/>
                </Link>
    )
}