import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { optionsNav } from '../constants/constants'
import { useAppSelector } from '../hooks/store'
import { LogoIcon, SearchIcon, ShoppingCartIcon } from './Icons'
import ModalLogin from './ModalLogin'
import useNavActions from '../hooks/useNavActions'
import useAuthActions from '../hooks/useAuthActions'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAutenticated = useAppSelector(state => state.auth.isAuthenticated)
  const itemActive = useAppSelector(state => state.nav)
  const { setItemMenuActive } = useNavActions()
  const { performLogout } = useAuthActions()

  const handleItemClick = e => {
    setItemMenuActive(e)
  }

  const handleClickLogout = () => {
    performLogout()
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <LogoIcon />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="space-between">
        {optionsNav.map(item => {
          if (itemActive.id == item.id) {
            return (
              <NavbarItem key={item.id} isActive>
                <NavLink to={item.route} className="text-primary">
                  {item.text}
                </NavLink>
              </NavbarItem>
            )
          } else {
            return (
              <NavbarItem
                key={item.id}
                onClick={() => handleItemClick(item.id)}
              >
                <NavLink to={item.route}>{item.text}</NavLink>
              </NavbarItem>
            )
          }
        })}
        <div className="hidden md:block">
          <Input
            classNames={{
              // base: 'max-w-full sm:max-w-[10rem] h-10',
              input: 'text-small',
              inputWrapper:
                'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon />}
            type="search"
          />
        </div>
      </NavbarContent>
      <NavbarContent className="gap-6" justify="end">
        <div className="relative inline-block">
          {/* Icono de carrito de compras */}
          <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
          {/* Número de elementos en la esquina */}
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            <span className="inline-block bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              3 {/* Aquí coloca el número real de elementos */}
            </span>
          </span>
        </div>
        {isAutenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?img=3"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">Pedidos</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={handleClickLogout}
              >
                Cerrar sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <ModalLogin></ModalLogin>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {optionsNav.map(item => (
          <NavbarMenuItem
            key={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <NavLink
              to={item.route}
              className={
                item.id === itemActive.id ? 'text-primary font-bold' : ''
              }
            >
              {item.text}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar
