import LeftBar from "@/components/LeftBar"
import RightBar from "@/components/RightBar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden">
            <LeftBar />
            <section className="xl:w-1/2 w-2/3 
        bg-dark-primary h-screen overflow-y-auto">
                {children}
            </section>
            <RightBar />
        </main>

    )
}

export default MainLayout