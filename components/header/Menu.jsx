import { useRouter } from 'next/router';
import { Menu as HeadlessMenu } from '@headlessui/react';
import DropDown from '../DropDown';

const menuItemsStyles = new Map([
  // styles for dropdown menu items
  ['dropdown', 'w-full p-2 pt-3 font-light text-[14px]'],
  ['ddHover', `active && 'bg-bggray-100/30 mix-blend-screen'`],
  // styles for wide menu items
  [
    'flexMenu',
    'text-white text-sm font-light tracking-wider transition duration-[.4s] m-2',
  ],
  ['flexHover', 'hover:text-[#b3b3b3] hover:cursor-pointer'],
]);

const MenuItems = ({ menus, type = 'dropdwon', className, cnHover }) => {
  const router = useRouter();
  const isDropDown = type === 'dropdown';

  const handleOnclick = (path) => {
    console.log(`go to ${path}`);
    router.push(path ?? '/');
  };

  const items = [...menus].map((menu) => (
    <button
      key={menu[0]}
      className={`${className} ${cnHover} ${menu[1].selected && 'font-bold'}}`}
      onClick={() => handleOnclick(menu[1]?.path)}
    >
      {menu[1].name}
    </button>
  ));

  const Items = isDropDown ? (
    <HeadlessMenu.Item as="div">{items}</HeadlessMenu.Item>
  ) : (
    <div>{items}</div>
  );

  return Items;
};

const MenuFlex = ({ children, className = '' }) => (
  <div className={`flex ml-10 ${className}`}>
    <div className="flex items-center">{children}</div>
  </div>
);

const Menu = ({ menus }) => {
  return (
    <>
      <DropDown className="md:hidden">
        <MenuItems
          menus={menus}
          type="dropdown"
          className={menuItemsStyles.get('dropdown')}
          cnHover={menuItemsStyles.get('ddHover')}
        />
      </DropDown>
      <MenuFlex className="hidden md:flex">
        <MenuItems
          menus={menus}
          type="flexMenu"
          className={menuItemsStyles.get('flexMenu')}
          cnHover={menuItemsStyles.get('flexHover')}
        />
      </MenuFlex>
    </>
  );
};

export default Menu;
