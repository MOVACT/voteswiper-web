/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';

const url = (path: string, attachLocale = false): string => {
  const router = useRouter();
  return `${process.env.NEXT_PUBLIC_PAGE_DOMAIN}${
    attachLocale ? `/${router.locale}` : ''
  }${path}`;
};

export default url;
