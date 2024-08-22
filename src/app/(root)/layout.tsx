import LeftBar from "@/components/LeftBar"
import RightBar from "@/components/RightBar"
import { currentUser } from "@clerk/nextjs/server"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
const currUser = await currentUser()
    return (
        <main className="flex w-full h-screen overflow-hidden">
            <LeftBar />
            <section className="xl:w-1/2 w-2/3 
        bg-dark-primary h-screen overflow-y-auto">
                {children}
            </section>
            <RightBar currUser={currUser} />
        </main>

    )
}

export default MainLayout