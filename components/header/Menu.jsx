import { useRouter } from 'next/router';
import { Menu as HeadlessMenu } from '@headlessui/react';
import DropDown from '../DropDown';

const menuItemsStyles = new Map([
  // styles for dropdown menu items
  ['dropdown', 'w-full p-2 pt-3 font-light text-[14px]'],
  ['ddHover', `bg-bggray-100/30 mix-blend-screen`],
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

  const handleOnclick = (path, menuId) => {
    // console.log(`go to ${path}`);
    menus.setSelected(menuId);
    router.push(path ?? '/');
  };

  const Items = isDropDown ? (
    <div className="flex flex-col">
      {[...menus].map((menu) => (
        <HeadlessMenu.Item as="div" key={menu[0]}>
          {({ active }) => (
            <button
              className={`${className} ${active && cnHover} ${
                menu[1].selected && 'font-bold'
              }`}
              onClick={() => handleOnclick(menu[1]?.path, menu[0])}
            >
              {menu[1].name}
            </button>
          )}
        </HeadlessMenu.Item>
      ))}
    </div>
  ) : (
    <div>
      {[...menus].map((menu) => (
        <button
          key={menu[0]}
          className={`${className} ${cnHover} ${
            menu[1].selected && 'font-bold'
          }`}
          onClick={() => handleOnclick(menu[1]?.path, menu[0])}
        >
          {menu[1].name}
        </button>
      ))}
    </div>
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
          //   selected={selected}
          type="dropdown"
          className={menuItemsStyles.get('dropdown')}
          cnHover={menuItemsStyles.get('ddHover')}
        />
      </DropDown>
      <MenuFlex className="hidden md:flex">
        <MenuItems
          menus={menus}
          //   selected={selected}
          type="flexMenu"
          className={menuItemsStyles.get('flexMenu')}
          cnHover={menuItemsStyles.get('flexHover')}
        />
      </MenuFlex>
    </>
  );
};

export default Menu;
