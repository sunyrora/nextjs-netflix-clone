import { fetchUrlsHome, fetchUrlTVShows } from '../../utils/movieRequests';

const menusInfos = [
  {
    id: 'home',
    name: 'Home',
    selected: false,
    fetchUrls: fetchUrlsHome,
  },
  {
    id: 'tvshows',
    name: 'TV Shows',
    fetchUrls: fetchUrlTVShows,
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
      // name: menu.name,
      path: `${process.env.contentsBasePath}/${menu.id}`,
      // path: {
      //   pathname: `${process.env.contentsBasePath}`,
      //   // pathname: `${process.env.contentsBasePath}/${menu.id}`,
      //   query: {
      //     menuId: menu.id,
      //   },
      //   as: process.env.asPath,
      // },
      // selected: false,
      ...menu,
    },
  ])
);

export default menus;
