
import { FaHandshake, FaMoneyBill, FaUserPlus } from "react-icons/fa6";
import { IoCarSport, IoPeople } from "react-icons/io5";
import { FcStatistics } from "react-icons/fc";

interface NavItemProps{

    defaultClasses?:string
    name:string,
    href?:string,
    activeClasses:string,
    linkIcon:React.ReactNode,
    className?:({isActive}:any) =>void

}

let defaultClasses = "hover:bg-gray-500 px-6 py-1 rounded-md flex flex-row items-center gap-4 text-gray-200"
let activeClasses="bg-gray-500 px-6 py-1  rounded-md flex flex-row items-center gap-4 text-gray-200"


type NavItemsArrayProps=NavItemProps[]

export const NavItems:NavItemsArrayProps=[
    {
        href:"/dashboard/statistics",
        name:'Statistics',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:FcStatistics,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },
     
      {
        href:"/dashboard/billing",
        name:'Billing',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:FaMoneyBill,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },
      {
        href:"/dashboard/partners",
        name:'Partners',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:FaHandshake,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },

      {
        href:"/dashboard/subscriptions",
        name:'Subscriptions',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:FaUserPlus,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },
      {
        href:"/dashboard/system-users",
        name:'System Users',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:IoPeople,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },
      {
        href:"/dashboard/vihicles",
        name:'Vehicles',
        defaultClasses:defaultClasses,
        activeClasses:activeClasses,
        linkIcon:IoCarSport,

        className:({ isActive }) =>
        [
          defaultClasses,
          isActive
            ? activeClasses
            : null,
        ]
          .filter(Boolean)
          .join(" ")
      },
      
      
    
    

]


