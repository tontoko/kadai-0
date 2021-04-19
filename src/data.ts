import { DateTime } from 'luxon';

const appData = [
  {
    name: 'Ishikawa',
    country: 'Japan',
    study: false,
    start: DateTime.local(1991, 4),
    end: DateTime.local(2004, 3),
  },
  {
    name: 'Toyama',
    country: 'Japan',
    study: false,
    start: DateTime.local(2004, 4),
    end: DateTime.local(2010, 3),
  },
  {
    name: 'Saitama',
    country: 'Japan',
    study: true,
    start: DateTime.local(2010, 4),
    end: DateTime.local(2014, 3),
  },
  {
    name: 'Bremen',
    country: 'Germany',
    study: false,
    start: DateTime.local(2014, 4),
    end: DateTime.local(2015, 3),
  },
  {
    name: 'Weimar',
    country: 'Germany',
    study: true,
    start: DateTime.local(2015, 4),
    end: DateTime.local(2017, 3),
  },
  {
    name: 'Salzburg',
    country: 'Austria',
    study: true,
    start: DateTime.local(2017, 4),
    end: DateTime.local(2019, 2),
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    study: false,
    start: DateTime.local(2019, 3),
    end: DateTime.local(2020, 11),
  },
  {
    name: 'Kanagawa',
    country: 'Japan',
    study: false,
    start: DateTime.local(2020, 12),
    end: DateTime.local(2021, 4),
  },
] as const;

export default appData;
