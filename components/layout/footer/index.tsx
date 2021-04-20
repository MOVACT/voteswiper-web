import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Container from '../container';
import IconTwitter from 'icons/twitter.svg';
import IconFacebook from 'icons/facebook.svg';
import IconInstagram from 'icons/instagram.svg';
import IconGithub from 'icons/github.svg';
import Link from 'next/link';

const socialLinks = [
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
            <item.icon className="w-3 lg:w-4 h-auto mr-2 lg:mr-3" />
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
              className="inline-flex items-center hover:text-brand-highlight focus-default rounded"
            >
              {content}
            </a>
          ) : (
            <Link href={href} passHref>
              <a className="inline-flex items-center hover:text-brand-highlight focus-default rounded">
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
      <div className="h-px opacity-25 bg-white" />
      <div className="bg-black bg-opacity-25 py-6 md:py-10 text-white md:text-base lg:text-lg">
        <Container>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                id="socialMedia"
                className="font-medium md:text-lg pb-2 md:pb-4"
              >
                Social Media
              </div>
              <nav aria-labelledby="socialMedia">
                <ul>{socialLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 pt-6 md:pt-0">
              <div
                id="openSource"
                className="font-medium md:text-lg pb-2 md:pb-4"
              >
                Open Source
              </div>
              <nav aria-labelledby="openSource">
                <ul>
                  {openSourceLinks.map((item) => renderLink(item))}

                  <li className="py-1">
                    <div className="flex items-start">
                      <IconGithub className="w-3 lg:w-4 h-auto mr-2 lg:mr-3 opacity-50 mt-1 md:mt-2" />
                      <div>
                        <span className="opacity-50">{t('apiOnGithub')}</span>
                        <div className="md:-mt-1">
                          <span className="text-xs font-medium rounded-full px-2 py-1 leading-none bg-white text-brand-primary inline-block">
                            {t('availableSoon')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 pt-6 lg:pt-0">
              <div
                id="moreLinks"
                className="font-medium md:text-lg pb-2 md:pb-4"
              >
                {t('moreLinks')}
              </div>
              <nav aria-labelledby="moreLinks">
                <ul>{moreLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 pt-6 lg:pt-0">
              <div
                id="moreLinks"
                className="font-medium md:text-lg pb-2 md:pb-4"
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
