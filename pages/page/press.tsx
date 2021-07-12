import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import url from 'util/url';

const Press: NextPage = () => {
  return (
    <>
      <NextSeo title="Presse" canonical={url(`/page/presse`, true)} />
      <PageHeader
        title="Presse"
        breadcrumb={[
          {
            item: `/page/presse`,
            name: 'Presse',
          },
        ]}
      />
      <Page>
        <Container>
          <h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
            Pressekontakt
          </h2>

          <div className="pb-6 prose prose-white lg:pb-8 xl:pb-12">
            <p>
              Matthias Bannert
              <br />
              Telefon: +49 (0)30 4036669 43
              <br />
              E-Mail:{' '}
              <a className="text-underline" href="mailto:presse@voteswiper.org">
                press@voteswiper.org
              </a>
            </p>
          </div>

          <h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
            Downloads
          </h2>

          <div className="flex flex-col space-x-6 md:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <a
                href="/downloads/wahlswiper_logos.zip"
                title="Logo als ZIP"
                download
                className="block rounded-lg bg-gradient-to-b from-white to-brand-light-blue focus-default"
              >
                <div className="px-5 py-4 leading-tight">
                  <div className="pt-1 text-lg font-medium leading-4 text-brand-dark-blue">
                    Logos
                  </div>
                  <div className="pt-1 text-brand-primary">3.3 MB</div>
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <a
                href="/downloads/wahlswiper_screenshots.zip"
                title="Screenshots als ZIP"
                download
                className="block rounded-lg bg-gradient-to-b from-white to-brand-light-blue focus-default"
              >
                <div className="px-5 py-4 leading-tight">
                  <div className="pt-1 text-lg font-medium leading-4 text-brand-dark-blue">
                    App-Screenshots
                  </div>
                  <div className="pt-1 text-brand-primary">5.3 MB</div>
                </div>
              </a>
            </div>
          </div>
        </Container>
      </Page>
    </>
  );
};

export default Press;
