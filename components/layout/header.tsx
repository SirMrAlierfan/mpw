import Link from "next/link"
import { useState } from "react"
import headerLinks from "@/app/lib/header/headerLinks.json"
import languges from "@/app/lib/header/languges.json"
const Header = () => {
    const [lang, setLang] = useState<string>("fa");

    const [langMenu, setLangMenu] = useState<boolean>(false)
    return (

        <>
            <header className="flex w-full justify-around lg:px-60 sm:px-20 py-4">
                <section className="">
                    <button onClick={() => {
                        setLangMenu(true)
                    }}>انتخاب زبان</button>
                    {langMenu ? <section className="  text-black absolute top-10 flex flex-col">
                        {languges.map((lang) => (<button style={{ backgroundImage: `url(${lang.falg})` }} className={`px-2 my-1 bg-cover bg-center text-black font-semibold transition-all duration-200`} key={lang.id} onClick={() => { setLang(lang.code), setLangMenu(false) }}>{lang.name}</button>))}
                    </section>
                        : <></>}


                </section>
                <section className="flex w-4xl justify-around">
                    {headerLinks.map((link) => (<Link key={link.id} href={link.href}>{link.title}</Link>))}
                </section>
            </header>
            {console.log(lang)}
        </>
    )

}
export default Header