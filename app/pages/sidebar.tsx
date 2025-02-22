import Link from "next/link";

const Links = [
  {"name": "Home", "icon": "bi bi-house", "url": "/"},
  {"name": "Kamero official site", "icon": "bi bi-globe", "url": "https://kamero.rw"},
  {"name": "Login", "icon": "bi bi-box-arrow-right", "url": "https://app.kamero.rw/auth/login"},
]


const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 shadow-md shadow-slate-400 bg-white w-[18vw] h-full z-20 rounded-e-xl">
      <div className="flex flex-col py-7">
        <div className="logo border-b pb-3 px-2 mb-3 border-slate-300">
          <Link href={"/"} className="flex">
            <img src="/logo.svg" alt="logo" className="w-12 h-8 mr-1"/>
            <h4 className="text-xl font-medium text-nowrap text-teal-600">
              K RESEARCH BASE
            </h4>
          </Link>
        </div>
        {Links.map((link, key) =>(
          <Link key={key} href={link.url} className="mx-3 py-1 px-2 text-slate-700 font-medium rounded-md hover:text-[#00796b] hover:bg-slate-100">
            <i className={`${link.icon} mr-4 text-xl text-teal-600`}></i>
            <span>{link.name }</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default SideBar;