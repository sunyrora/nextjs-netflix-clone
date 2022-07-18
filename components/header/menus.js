import { CONTENT_PAGE_BASE_PATH } from '../../utils/constants';
// const menuIds = ['home', 'tvshows', 'movies', 'newpopular', 'mylist'];

const menus = [
  {
    id: 'home',
    name: 'Home',
    // path: `${CONTENT_PAGE_BASE_PATH}/main`,
    selected: false,
  },
  {
    id: 'tvshows',
    name: 'TV Shows',
  },

  {
    id: 'movies',
    name: 'Movies',
    // path: `${CONTENT_PAGE_BASE_PATH}/movies`,
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

const menuMap = new Map(
  menus.map((menu) => [
    menu.id,
    {
      name: menu.name,
      path: `${CONTENT_PAGE_BASE_PATH}/${menu.id}`,
      selected: false,
    },
  ])
);

export default menuMap;
