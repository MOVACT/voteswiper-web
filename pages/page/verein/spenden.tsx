import cn from 'classnames';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import url from 'util/url';
import { VereinPage } from '.';

const amounts = [
  {
    amount: 1,
    link: 'https://buy.stripe.com/9AQ5nvakP83W8ak000',
  },
  {
    amount: 5,
    link: 'https://buy.stripe.com/6oEdU1akP1Fy76g289',
  },
  {
    amount: 10,
    link: 'https://buy.stripe.com/fZe3fn78Dac48ak4gi',
  },
  {
    amount: 50,
    link: 'https://buy.stripe.com/5kA17f50vgAs2Q04gj',
  },
  {
    amount: 100,
    link: 'https://buy.stripe.com/5kAbLTakP4RKais6os',
  },
];

const Verein: NextPage = () => {
  const { t } = useTranslation();

  const [amount, setAmount] = React.useState<number>(10);

  const paymentLink = React.useMemo(() => {
    const tier = amounts.find((a) => a.amount === amount);

    return tier?.link;
  }, [amount]);

  return (
    <>
      <NextSeo
        title={t('org:donate')}
        canonical={url(`/page/verein/spenden`, true)}
      />
      <PageHeader
        title={t('org:donate')}
        breadcrumb={[
          {
            item: `/page/verein`,
            name: t('org:org'),
          },
          {
            item: `/page/verein/spenden`,
            name: t('org:donate'),
          },
        ]}
      />
      <Page>
        <Container>
          <VereinPage>
            <div className="prose prose-white">
              <p>
                Der WahlSwiper ist ein Projekt, das von{' '}
                <strong>Bürgern für Bürger</strong> gemacht wird. Wahl für Wahl
                kommt ein Team aus Wissenschaftlern & Freiwilligen zusammen, um
                eine neue Ausgabe zu erarbeiten.
              </p>
              <p>
                Mittlerweile erreichen wir mit diesem Projekt mehrere Millionen
                Menschen - und das kostet nicht nur Zeit, die wir gerne
                investieren, sondern auch bares Geld:
              </p>

              <p>
                So kostet alleine das Hosting bei größeren Wahlen schnell
                mehrere Hundert Euro. Wir sind daher auf{' '}
                <strong className="underline">Deine Unterstützung</strong>{' '}
                angewiesen, um das Projekt WahlSwiper auch in Zukunft mit und
                für euch realisieren zu können.
              </p>

              <h2>Unterstütze den WahlSwiper mit einer Spende</h2>

              <h3>Über PayPal spenden</h3>

              <p>Du kannst den Betrag auf der PayPal-Webseite selbst wählen.</p>
            </div>

            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
              className="mt-2 mb-8 -ml-3"
            >
              <input
                type="hidden"
                name="hosted_button_id"
                value="RXTWRWTNC6392"
              />
              <input
                type="image"
                src="/images/btn_donateCC_LG.gif"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              {/*<img
                alt=""
                border="0"
                src="https://www.paypal.com/de_DE/i/scr/pixel.gif"
                width="1"
                height="1"
              />*/}
            </form>

            <div className="prose prose-white">
              <h3>Mit Kreditkarte spenden</h3>
            </div>

            <div className="mt-5 mb-8 text-white">
              {amounts.map((donationAmount) => {
                return (
                  <button
                    onClick={() => {
                      setAmount(donationAmount.amount);
                    }}
                    key={donationAmount.amount}
                    className={cn(
                      'focus-default bg-white bg-opacity-10 rounded-lg mr-2 mb-2 px-6 py-2 ring-2',
                      amount === donationAmount.amount
                        ? 'ring-white'
                        : 'ring-transparent'
                    )}
                  >
                    {donationAmount.amount}€
                  </button>
                );
              })}

              <Button
                size="blank"
                className="px-4 py-2 rounded-lg"
                target="_blank"
                href={paymentLink}
              >
                Spenden
              </Button>
            </div>

            <div className="prose prose-white">
              <h3>Klassisch per Banküberweisung spenden</h3>

              <p>
                Du kannst auch einen Betrag deiner Wahl per Banküberweisung
                spenden. Unser Spendenkonto lautet:
              </p>

              <p>
                VoteSwiper
                <br />
                Deutsche Skatbank
                <br />
                IBAN: DE67&nbsp;8306&nbsp;5408&nbsp;0004&nbsp;2984&nbsp;62
                <br />
                BIC: GENO&nbsp;DEF1&nbsp;SLR
              </p>
            </div>
          </VereinPage>
        </Container>
      </Page>
    </>
  );
};

export default Verein;
