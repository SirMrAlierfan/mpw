import Link from "next/link"
import { useEffect, useState } from "react"
import headerLinks from "@/app/lib/header/headerLinks.json"

const Header = () => {
    useEffect(() => {
        fetch("http://690861422d902d0651b00a59.mockapi.io/languges")
        .then((res)=>res.json())
        .then((data)=>{
            setLanguges(data)
        })
    }

    )
    const [languges,setLanguges]=useState<{id:number,code:string,name:string,falg:string}[]>([])
    const [lang, setLang] = useState<string>("fa");
    const [langMenu, setLangMenu] = useState<boolean>(false)
    const langButton = headerLinks.find((item) => item.id === 0)
    const navbar = headerLinks.filter((item) => item.id !== 0)
    return (

        <>
            <header className="flex w-full justify-around lg:px-60 sm:px-20 py-4">
                <section className="">
                    <button onClick={() => {
                        setLangMenu(true)
                    }}>{langButton?.title[lang as "fa" | "en"]}</button>
                    {langMenu ? <section className="  text-black absolute top-10 flex flex-col">
                        {languges.map((lang) => (<button style={{ backgroundImage: `url(${lang.falg})` }} className={`px-2 my-1 bg-cover bg-center text-black font-semibold transition-all duration-200`} key={lang.id} onClick={() => { setLang(lang.code); setLangMenu(false); }}>{lang.name}</button>))}
                    </section>
                        : <></>}


                </section>
                <section className="flex w-4xl justify-around">
                    {navbar.map(link => (
                        <Link key={link.id} href={link.href ?? "/"}>
                            {link.title[lang as "fa" | "en"]}
                        </Link>
                    ))}

                </section>
            </header>

        </>
    )

}
export default Header