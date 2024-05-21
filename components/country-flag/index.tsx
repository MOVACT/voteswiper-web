import Flags from 'country-flag-icons/react/3x2';
import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  countryCode: string;
}

const CountryFlag: React.FC<Props> = ({ countryCode, ...restProps }) => {
  switch (countryCode) {
    case 'at':
      return <Flags.AT {...restProps} />;
    case 'de':
      return <Flags.DE {...restProps} />;
    case 'fi':
      return <Flags.FI {...restProps} />;
    case 'fr':
      return <Flags.FR {...restProps} />;
    case 'se':
      return <Flags.SE {...restProps} />;
    case 'it':
      return <Flags.IT {...restProps} />;
    default:
      return <svg />;
  }
};

export default CountryFlag;
