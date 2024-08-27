'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import React from "react"

const SideBarSheet = () => {


    const pathname = usePathname();

    const { isSignedIn } = useAuth();
    const [sheetOpen, setSheetOpen] = React.useState(false);

    return (
        <Sheet >
            <SheetTrigger onClick={() => setSheetOpen(true)}>
                <div className="flex items-center md:hidden justify-center p-4 bg-dark-secondary absolute top-16 -left-4 rounded-full">
                    <Image
                        src={'/sidebar-collapse.svg'}
                        alt="sidebar-collapse"
                        width={24}
                        height={24}
                    />
                </div>

            </SheetTrigger>
            {sheetOpen && (
                <SheetContent side={"left"}>
                    <aside className="flex w-full  bg-dark-secondary flex-col h-screen overflow-hidden justify-between">
                        <div>
                            <div className="flex gap-4 px-10 py-6">
                                <Image
                                    src={'/logo.svg'}
                                    alt="logo"
                                    width={24}
                                    height={24}
                                />
                                <h1 className="font-extrabold text-2xl">Podcastings </h1>
                            </div>

                            <div className='flex flex-col gap-4'>
                                {sidebarLinks.map((link) => {

                                    const isActive = pathname === link.link
                                    const isHomeLink = link.link === '/'
                                    return (
                                        <SheetTrigger asChild key={link.name}>
                                            <Link
                                                href={link.link}
                                                key={link.name}
                                                className={cn(`flex gap-4 px-10 py-4 cursor-pointer items-center justify-start text-base font-medium opacity-80 hover:opacity-100`,
                                                    isActive && 'sidebar-link-gradient border-r-4 border-orange opacity-100')}>
                                                <Image
                                                    src={link.icon}
                                                    alt={link.name}
                                                    width={24}
                                                    height={24}
                                                    className={isHomeLink ? 'opacity-50' : 'opacity-100 hover:opacity-100'}

                                                />
                                                <p>{link.name}</p>
                                            </Link>
                                        </SheetTrigger>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-4 w-full px-10">
                            {isSignedIn ? (
                                <Button variant={'primary'} className="flex gap-4 w-full font-bold">
                                    <Image src='/loginout.svg' width={20} height={20} alt="loginout" /><SignOutButton />
                                </Button>
                            ) : (
                                <Button variant={'primary'} className="flex gap-4 w-full font-bold">
                                    <Image src='/loginout.svg' width={20} height={20} alt="loginout" />  <SignInButton />
                                </Button>
                            )}
                        </div>

                    </aside>
                </SheetContent>
            )}

        </Sheet>

    )
}

export default SideBarSheet
