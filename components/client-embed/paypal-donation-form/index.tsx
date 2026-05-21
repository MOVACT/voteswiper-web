import { useRouter } from 'next/router';
import React from 'react';

const PaypalDonationForm: React.FC = () => {
  const { locale } = useRouter();

  if (locale === 'de') {
    return (
      <form
        action="https://www.paypal.com/donate"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="hosted_button_id" value="RXTWRWTNC6392" />
        <input
          type="image"
          src="/images/btn_donateCC_LG.gif"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
      </form>
    );
  }

  return (
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="hosted_button_id" value="6GBGDVRAYBR2W" />
      <input
        type="image"
        src="/images/btn_donateCC_LG_en.gif"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
    </form>
  );
};

export default PaypalDonationForm;
