import { Link } from "react-router";


const NavbarItemCategoriy = ({ category, onClick }) => {
  return (
    <Link
      to={`/categories/${category?.name}`}
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-lg p-4 duration-200 lg:flex-row hover:bg-gray-100"
    >
      <div>
        <h3 className="mb-1 text-base font-semibold text-dark duration-200 hover:text-primary">
          {category?.name}
        </h3>
      </div>
    </Link>
  )
}

export default NavbarItemCategoriy;