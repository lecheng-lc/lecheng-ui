import Bem from '@@/bem/README.md';
import Test from '@@/test/README.md';
import SlideBlock from '@@/slide-block/README.md';
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
    title: '滑动删除',
    items: [
      {
        title: '左滑删除',
        noDemo: false,
        name: 'slide-block',
      },
    ]
  }
]

export const markdown = {
  Bem,
  Test,
  SlideBlock
};
