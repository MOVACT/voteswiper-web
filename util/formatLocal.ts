import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import en from 'date-fns/locale/en-GB';
import fa from 'date-fns/locale/fa-IR';
import ru from 'date-fns/locale/ru';
import tr from 'date-fns/locale/tr';

const formatLocal = (
  date: number | Date,
  dateFormat: string,
  locale?: string
): string => {
  let l = en;

  switch (locale) {
    case 'de':
      l = de;
      break;
    case 'ar':
      l = en;
      break;
    case 'fa':
      l = fa;
      break;
    case 'ru':
      l = ru;
      break;
    case 'tr':
      l = tr;
      break;
  }

  return format(date, dateFormat, { locale: l });
};

export default formatLocal;
