import createCache from '@emotion/cache';

/* istanbul ignore next */
const createEmotionCache = () => createCache({ key: 'css' });
export default createEmotionCache;
