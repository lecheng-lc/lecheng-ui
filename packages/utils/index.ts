import bem from '../bem';
/* deprecate */
export function use(name: string, app?: string) {
  return [
    bem(name, app || 'lc', true),
  ];
}

export * from './basic';
export * from './props';
export * from './dom';
export * from './create';
export * from './format';
export * from './constant';
export * from './validate';
export * from './interceptor';
export * from './with-install';

