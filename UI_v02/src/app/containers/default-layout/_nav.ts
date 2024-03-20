import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'BlogPosts',
    iconComponent: {name: 'cilBookmark'},
    children: [
      {
        name: 'Add Blog Posts',
        url: '/admin/blogPosts/add',
      },
      {
        name: 'List Blog Posts',
        url: '/admin/blogPosts',
      }
    ]
  },
  {
    name: 'Categories',
    iconComponent: {name: 'cil-puzzle'},
    children: [
      {
        name: 'Add Categories',
        url: '/admin/categories/add',
      },
      {
        name: 'List Categories',
        url: '/admin/categories',
      }
    ]
  }
];
