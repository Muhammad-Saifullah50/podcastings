import { User } from "@clerk/nextjs/server";
import Image from "next/image";

interface RightBarProps {
  currUser: User | null;
}
const RightBar = async ({ currUser }: RightBarProps) => {
  return (
    <aside className='hidden xl:flex xl:w-1/4 bg-dark-secondary'>
      <div>
        {currUser ? (
          <div className="flex gap-6 items-center px-10 py-6">
            <Image
              src={currUser?.imageUrl}
              width={60}
              height={60}
              alt='profile'
              className='rounded-full'
            />
            <h5 className="font-semibold text-base">{currUser?.fullName}</h5>
          </div>
        ) : (
          <p>Not signed in</p>
        )}

      </div>
      <div></div>
      <div></div>
    </aside >
  )
}

export default RightBar
