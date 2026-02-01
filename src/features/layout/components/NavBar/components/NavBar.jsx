import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import CartWidget from '../../../../../components/CartWidget'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import NavbarItemCategoriy from './NavbarItemCategory'

const NavBar = ({isLoading, categories}) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Validar si el clic fue fuera del menú, trabajando con la referencia
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMegaMenu(false);
      }
    };

    // Agregar el event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className="relative bg-blue-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="flex items-center">
                <img
                  alt="Your Company"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1TeZqtvf1gWOrxuDuyC56KFH1Sgdc4B-Lg&s"
                  className="h-8 w-auto"
                />
                <h1 className="ml-3 text-xl font-bold text-white">Mi Ecommerce</h1>
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMegaMenu(!showMegaMenu)}
                    className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white lg:ml-12 lg:inline-flex lg:w-auto lg:justify-center cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cargando...' : 'Categorías'}
                    <span
                      className={`${showMegaMenu ? "-scale-y-100" : ""} duration-200`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`w-full lg:absolute lg:left-0 lg:top-full lg:w-[850px] lg:rounded-xl lg:shadow-lg z-50 ${showMegaMenu ? "block" : "hidden"}`}
                  >
                    <div className="rounded-t-xl bg-white p-2 lg:p-8 bg-dark">
                      <div className="mb-8">
                        <h4 className="mb-1 text-base font-medium text-dark text-dark-6">
                          Categorias
                        </h4>
                        <p className="text-sm text-body-color text-dark-6">
                          Selecciona la categoria para ver sus productos.
                        </p>
                      </div>
                      <div className="grid gap-y-2 lg:grid-cols-4 lg:gap-x-5">
                        {categories.map((cat) => (
                          <NavbarItemCategoriy
                            key={cat.id}
                            category={cat}
                            onClick={() => setShowMegaMenu(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <CartWidget />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}


export default NavBar