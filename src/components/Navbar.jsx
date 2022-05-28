import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full px-14 pt-5 box-border bg-transparent mb-5">
      <ul className="flex mx-0 my-auto items-center justify-end gap-5 text-white">
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'bg-white py-1 px-2 rounded-md text-violet-600' : 'text-white')} to="/mint">Mint</NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'bg-white py-1 px-2 rounded-md text-violet-600' : 'text-white')} to="/transfer">Transfer</NavLink>
        </li>
      </ul>
    </div>
  )
}
