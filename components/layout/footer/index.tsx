import IconFacebook from 'icons/facebook.svg';
import IconGithub from 'icons/github.svg';
import IconInstagram from 'icons/instagram.svg';
import IconTwitter from 'icons/twitter.svg';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import Container from '../container';

export const socialLinks = [
  {
    href: 'twitterLink',
    translatedLink: true,
    text: 'Twitter',
    translatedText: false,
    icon: IconTwitter,
  },
  {
    href: 'facebookLink',
    translatedLink: true,
    text: 'Facebook',
    translatedText: false,
    icon: IconFacebook,
  },
  {
    href: 'instagramLink',
    translatedLink: true,
    text: 'Instagram',
    translatedText: false,
    icon: IconInstagram,
  },
];

const openSourceLinks = [
  {
    href: 'https://github.com/movact/voteswiper-app',
    translatedLink: false,
    text: 'appOnGithub',
    translatedText: true,
    icon: IconGithub,
  },
  {
    href: 'https://github.com/movact/voteswiper-web',
    translatedLink: false,
    text: 'websiteOnGithub',
    translatedText: true,
    icon: IconGithub,
  },
];

const moreLinks = [
  {
    href: 'faqLink',
    translatedLink: true,
    text: 'faq',
    translatedText: true,
    icon: null,
  },
  {
    href: 'pressLink',
    translatedLink: true,
    text: 'press',
    translatedText: true,
    icon: null,
  },
  {
    href: 'mailto:info@voteswiper.org',
    translatedLink: false,
    text: 'contact',
    translatedText: true,
    icon: null,
  },
];

const legalLinks = [
  {
    href: 'imprintLink',
    translatedLink: true,
    text: 'imprint',
    translatedText: true,
    icon: null,
  },
  {
    href: 'privacyLink',
    translatedLink: true,
    text: 'privacy',
    translatedText: true,
    icon: null,
  },
];

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');

  const renderLink = React.useCallback(
    (item) => {
      const href = item.translatedLink ? t(item.href) : item.href;
      const isExternal =
        href.indexOf('http') > -1 || href.indexOf('mailto') > -1 === true;

      const content = (
        <>
          {item.icon && (
            <item.icon className="w-3 h-auto mr-2 lg:w-4 lg:mr-3" />
          )}
          {item.translatedText ? t(item.text) : item.text}
        </>
      );

      return (
        <li className="py-1" key={item.href}>
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center rounded hover:text-brand-highlight focus-default"
            >
              {content}
            </a>
          ) : (
            <Link href={href} passHref>
              <a className="inline-flex items-center rounded hover:text-brand-highlight focus-default">
                {content}
              </a>
            </Link>
          )}
        </li>
      );
    },
    [t]
  );

  return (
    <>
      <div className="h-px bg-white opacity-[0.1]" />
      <div className="py-6 text-white md:py-10 md:text-base lg:text-lg">
        <Container>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 lg:w-1/4">
              <div
                id="socialMedia"
                className="pb-2 font-medium md:text-lg md:pb-4"
              >
                Social Media
              </div>
              <nav aria-labelledby="socialMedia">
                <ul>{socialLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
            <div className="w-full px-4 pt-6 md:w-1/2 lg:w-1/4 md:pt-0">
              <div
                id="openSource"
                className="pb-2 font-medium md:text-lg md:pb-4"
              >
                Open Source
              </div>
              <nav aria-labelledby="openSource">
                <ul>
                  {openSourceLinks.map((item) => renderLink(item))}

                  <li className="py-1">
                    <div className="flex items-start">
                      <IconGithub className="w-3 h-auto mt-1 mr-2 opacity-50 lg:w-4 lg:mr-3 md:mt-2" />
                      <div>
                        <span className="opacity-50">{t('apiOnGithub')}</span>
                        <div className="md:-mt-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium leading-none bg-white rounded-full text-brand-primary">
                            {t('availableSoon')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-full px-4 pt-6 md:w-1/2 lg:w-1/4 lg:pt-0">
              <div
                id="moreLinks"
                className="pb-2 font-medium md:text-lg md:pb-4"
              >
                {t('moreLinks')}
              </div>
              <nav aria-labelledby="moreLinks">
                <ul>{moreLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
            <div className="w-full px-4 pt-6 md:w-1/2 lg:w-1/4 lg:pt-0">
              <div
                id="moreLinks"
                className="pb-2 font-medium md:text-lg md:pb-4"
              >
                {t('legalLinks')}
              </div>
              <nav aria-labelledby="moreLinks">
                <ul>{legalLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
