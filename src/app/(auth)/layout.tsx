import Image from "next/image"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (<section className="w-screen h-screen flex items-center justify-center">
        <Image
            src={"/authbg.png"}
            alt="background"
            fill
        />
        {children}

    </section>)
}

export default AuthLayout