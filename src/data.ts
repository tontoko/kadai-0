import { DateTime } from 'luxon';

const appData = [
  {
    name: 'Ishikawa',
    country: 'Japan',
    study: false,
    start: DateTime.local(1991, 4),
    end: DateTime.local(2004, 3),
    location: [136.65666192542224, 36.56027891818364],
  },
  {
    name: 'Toyama',
    country: 'Japan',
    study: false,
    start: DateTime.local(2004, 4),
    end: DateTime.local(2010, 3),
    location: [137.011444486721, 36.748121333956796],
  },
  {
    name: 'Saitama',
    country: 'Japan',
    study: true,
    start: DateTime.local(2010, 4),
    end: DateTime.local(2014, 3),
    location: [139.51046255636126, 35.871280567763414],
  },
  {
    name: 'Bremen',
    country: 'Germany',
    study: false,
    start: DateTime.local(2014, 4),
    end: DateTime.local(2015, 3),
    location: [8.8103115296823, 53.09675133794013],
  },
  {
    name: 'Weimar',
    country: 'Germany',
    study: true,
    start: DateTime.local(2015, 4),
    end: DateTime.local(2017, 3),
    location: [11.314135374011515, 50.968156595187956],
  },
  {
    name: 'Salzburg',
    country: 'Austria',
    study: true,
    start: DateTime.local(2017, 4),
    end: DateTime.local(2019, 2),
    location: [13.043167365187193, 47.808236445482414],
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    study: false,
    start: DateTime.local(2019, 3),
    end: DateTime.local(2020, 11),
    location: [139.62827945163596, 35.774877552274404],
  },
  {
    name: 'Kanagawa',
    country: 'Japan',
    study: false,
    start: DateTime.local(2020, 12),
    end: DateTime.local(2021, 4),
    location: [139.48817771024252, 35.52248534369408],
  },
] as const;

export default appData;
