import { useCallback, useEffect, useState } from 'react';

const menusInfos = [
  {
    id: 'home',
    name: 'Home',
    selected: false,
  },
  {
    id: 'tvshows',
    name: 'TV Shows',
  },

  {
    id: 'movies',
    name: 'Movies',
  },
  {
    id: 'newpopular',
    name: 'New & Popular',
  },
  {
    id: 'mylist',
    name: 'My List',
  },
];

class MenuMap extends Map {
  setSelected(id) {
    this.forEach((value, key) => {
      key === id ? (value.selected = true) : (value.selected = false);
    });

    return true;
  }
}

const menus = new MenuMap(
  menusInfos.map((menu) => [
    menu.id,
    {
      name: menu.name,
      path: `${process.env.contentsBasePath}/${menu.id}`,
      selected: false,
    },
  ])
);

export default menus;

// export const useMenu = () => {
//   const menusInfos = [
//     {
//       id: 'home',
//       name: 'Home',
//       selected: false,
//     },
//     {
//       id: 'tvshows',
//       name: 'TV Shows',
//     },

//     {
//       id: 'movies',
//       name: 'Movies',
//     },
//     {
//       id: 'newpopular',
//       name: 'New & Popular',
//     },
//     {
//       id: 'mylist',
//       name: 'My List',
//     },
//   ];

//   const initialState = menusInfos.map((menu) => [
//     menu.id,
//     {
//       name: menu.name,
//       path: `${CONTENT_PAGE_BASE_PATH}/${menu.id}`,
//       selected: false,
//     },
//   ]);

//   const [menus, setMenus] = useState(new MenuMap(initialState));
//   const [selectedMenu, setSelectedMenu] = useState();

//   const setSelected = useCallback(
//     (id) => {
//       setSelectedMenu(id);

//       setMenus((prev) => {
//         const newMenu = new MenuMap(prev);
//         // console.log('newMenuMap: ', newMenu);
//         newMenu.setSelected(id);
//         return newMenu;
//       });
//     },
//     [selectedMenu]
//   );

//   const actions = {
//     setSelected,
//     // setSelectedMenu,
//   };

//   return { menus, selectedMenu, actions };
// };

// export default useMenu;

// export const [menus, { setSelected }] = useMenu();

// const menuMap = new MenuMap(
//   menus.map((menu) => [
//     menu.id,
//     {
//       name: menu.name,
//       path: `${CONTENT_PAGE_BASE_PATH}/${menu.id}`,
//       selected: false,
//     },
//   ])
// );

// export default new MenuMap(
//   menus.map((menu) => [
//     menu.id,
//     {
//       name: menu.name,
//       path: `${CONTENT_PAGE_BASE_PATH}/${menu.id}`,
//       selected: false,
//     },
//   ])
// );
