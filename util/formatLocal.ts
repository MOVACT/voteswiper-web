import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import en from 'date-fns/locale/en-GB';

const formatLocal = (
  date: number | Date,
  dateFormat: string,
  locale?: string
): string => {
  let l = en;

  switch (locale) {
    case 'de':
      l = de;
  }

  return format(date, dateFormat, { locale: l });
};

export default formatLocal;
