'use client'
import { sidebarLinks } from "@/data"
import { cn } from "@/lib/utils"
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

const LeftBar = () => {

  const pathname = usePathname();

  const { isSignedIn } = useAuth();

  return (
    <aside className="hidden md:flex md:w-1/3 xl:w-1/4  bg-dark-secondary flex-col h-screen overflow-hidden">
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
          )
        })}
      </div>
{/* // TODO: working on signin signout btn  */}
{/* // Todo: have to test ui of no podcasts found */}
      <div>
        {isSignedIn ? (
          <Button variant={'primary'}>
            <SignOutButton />
          </Button>
        ) : (
          <Button variant={'primary'}>
            <SignInButton />
          </Button>
        )}
      </div>

    </aside>
  )
}

export default LeftBar

