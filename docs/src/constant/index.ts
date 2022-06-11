import Bem from '@@/bem/README.md';
import SwipeCell from '@@/swipe-cell/README.md';
import DynamicImport from '@@/dynamic-import/README.md'
import Principle from '@@/principle/README.md'
import Locale from '@@/locale/README.md'
import FrequentlyQa from '@@/frequently-qa/README.md'
import ScrollTab from '@@/scroll-tab/README.md'
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
    title: '开发指南',
    items: [
      {
        title: '组件原则',
        noDemo: true,
        name: 'principle',
      },
      {
        title: '国际化',
        noDemo: true,
        name: 'locale'
      },
      {
        title: '按需引入',
        noDemo: true,
        name: 'dynamic-import'
      },
      {
        title: '框架常见问题',
        noDemo: true,
        name: 'frequently-qa'
      }
    ],
  },
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
        name: 'swipe-cell',
      },
    ]
  },
  {
    title: '滚动吸顶',
    items: [
      {
        title: '滚动吸顶',
        noDemo: false,
        name: 'scroll-tab',
      },
    ]
  }
]

export const markdown = {
  Bem,
  SwipeCell,
  DynamicImport,
  Principle,
  FrequentlyQa,
  Locale
}
