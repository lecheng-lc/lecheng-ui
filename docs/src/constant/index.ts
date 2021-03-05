import Bem from '@@/bem/README.md';
import Test from '@@/test/README.md';

export interface PackageItem {
  title: string;
  name: string;
  noDemo?: boolean;
}

export interface PackageItemGroup {
  items: PackageItem[];
  title: string;
}

export const routerDir: PackageItemGroup[] = [
  {
    title: '全局工具函数',
    items: [
      {
        title: 'Bem 样式函数',
        noDemo: true,
        name: 'bem',
      },
    ],
  },
  {
    title: '测试页面',
    items: [
      {
        title: '测试一',
        noDemo: false,
        name: 'test',
      },
    ],
  }
];

export const markdown = {
  Bem,
  Test
};
