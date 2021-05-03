import { Disclosure } from '@headlessui/react';
import cn from 'classnames';
import Container from 'components/layout/container';
import PageContainer from 'components/page';
import PageHeader from 'components/page-header';
import IconChevronRight from 'icons/chevron-right.svg';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
import { render } from 'storyblok-rich-text-react-renderer';
import url from 'util/url';
import { socialLinks } from '../../footer';

interface FaqItem {
  _uid: string;
  body: Richtext;
  title: string;
  component: 'faqItem';
}

export type FaqPageStory = {
  component: 'faqPage';
  title: string;
  questions: FaqItem[];
};

interface Props {
  story: StoryblokStory<FaqPageStory>;
}

const FaqPage: React.FC<Props> = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { title, questions } = story.content;

  const renderLink = React.useCallback(
    (item) => {
      const href = item.translatedLink ? t(item.href) : item.href;

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
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center text-white rounded hover:text-brand-highlight focus-default"
          >
            {content}
          </a>
        </li>
      );
    },
    [t]
  );

  return (
    <>
      <NextSeo
        title={title}
        canonical={url(`/page/${router.query.page}`, router.locale !== 'de')}
      />
      <PageHeader
        breadcrumb={[
          {
            item: `/${router.query.page}`,
            name: title,
          },
        ]}
        title={title}
      />
      <PageContainer>
        <Container>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4">
              <div className="pb-2 rounded-lg lg:max-w-4xl lg:p-4 lg:bg-gradient-to-b from-white to-brand-light-blue">
                {questions.map((question) => {
                  return (
                    <Disclosure key={question._uid}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 font-medium text-left text-white bg-white rounded hover:bg-opacity-20 lg:bg-brand-primary bg-opacity-10 lg:bg-opacity-10 focus-default lg:text-brand-dark-blue">
                            <span>{question.title}</span>
                            <IconChevronRight
                              className={cn(
                                'transform transition w-auto h-3 mt-[6px] ml-2 flex-shrink-0',
                                open && 'rotate-90'
                              )}
                            />
                          </Disclosure.Button>

                          <Disclosure.Panel>
                            <div className="pb-4 prose-white lg:prose">
                              {render(question.body)}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  );
                })}
              </div>
            </div>
            <div className="lg:w-1/4 lg:pl-8">
              <h2 className="text-lg font-medium text-white lg:text-xl">
                {t('page:faqMoreTitle')}
              </h2>
              <p className="text-white">{t('page:faqMoreText')}</p>

              <nav className="hidden pt-4 lg:block">
                <ul>{socialLinks.map((item) => renderLink(item))}</ul>
              </nav>
            </div>
          </div>
        </Container>
      </PageContainer>
    </>
  );
};

export default FaqPage;
