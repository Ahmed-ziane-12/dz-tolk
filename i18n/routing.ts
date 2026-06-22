import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'ar', 'fr', 'ar-dz'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
});
