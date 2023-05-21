import { Browser } from '@capacitor/browser';

export const openSite = async () => {
  await Browser.open({ url: 'https://www.linkedin.com/in/hugo-gaytan-3a5685175/' });
};