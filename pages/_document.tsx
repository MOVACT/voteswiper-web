import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html className="bg-brand-primary min-h-[initial] h-[auto]">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/images/meta/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/images/meta/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/images/meta/favicon-16x16.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/images/meta/site.webmanifest`}
          />
          <link
            rel="mask-icon"
            color="#5bbad5"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/images/meta/safari-pinned-tab.svg`}
          />
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_PAGE_DOMAIN}/favicon.ico`}
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
