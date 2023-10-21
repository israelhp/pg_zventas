import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { optionsNav } from '../constants/constants'
import { useAppSelector } from '../hooks/store'
import {
  LogoIcon,
  SearchIcon,
  ShoppingCartIcon,
  ChevronDown,
  ServerIcon
} from './Icons'
import ModalLogin from './ModalLogin'
import useNavActions from '../hooks/useNavActions'
import useAuthActions from '../hooks/useAuthActions'

const NavBar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState(['WOOFER'])
  const isAutenticated = useAppSelector(state => state.auth.isAuthenticated)
  const itemActive = useAppSelector(state => state.nav)
  const cartItemsCount = useAppSelector(state => state.shoppingCart.count)
  const { setItemMenuActive, getCategories } = useNavActions()
  const { performLogout } = useAuthActions()

  useEffect(() => {
    getCategories({ usuario: '' }).then(res => {
      setCategories(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleItemClick = e => {
    setItemMenuActive(e)
  }

  const handleClickProducts = category => {
    navigate(`/catalog/${category}`)
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
          <NavLink to="/">
            <LogoIcon />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="space-between">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                startContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                {itemActive.id == 3 ? (
                  <span className="text-blue-500 font-bold text-base">
                    Productos
                  </span>
                ) : (
                  <span
                    className="text-base"
                    onClick={() => handleItemClick(3)}
                  >
                    Productos
                  </span>
                )}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: 'gap-4'
            }}
          >
            {categories.map(item => {
              return (
                <DropdownItem
                  key={item}
                  startContent={
                    <ServerIcon
                      className="text-primary"
                      fill="currentColor"
                      size={30}
                    />
                  }
                  onClick={() => handleClickProducts(item)}
                >
                  {item}
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
        {optionsNav.map(item => {
          if (item.id != 3) {
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
        <NavLink to={'/shopping-cart'}>
          <div className="relative inline-block">
            <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              <span className="inline-block bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            </span>
          </div>
        </NavLink>
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
              <DropdownItem key="settings">
                <NavLink to={'/orders'}>Pedidos</NavLink>
              </DropdownItem>
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
