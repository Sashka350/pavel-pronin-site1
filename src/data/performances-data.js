/**
 * performances-data.js — реестр спектаклей.
 * Источник: старый сайт pavelpronin.me/performances/ (перенесено 01.09.2026).
 *
 * Поля:
 *   slug    — англ. слаг для URL (/performances/<slug>/)
 *   title   — название спектакля
 *   author  — автор / первоисточник
 *   theater — театр
 *   year    — год премьеры
 *   status  — 'live' (идёт в репертуаре) | 'archive' (архив)
 *   image   — постер/фото (пока URL со старого сайта, заменим на реальные фото)
 *
 * ВАЖНО: статусы и годы — предварительные, уточнить у заказчика.
 */

export const performances = [
  {
    slug: 'fivespoonsofelixir',
    title: '«Пять ложек эликсира»',
    author: 'по киносценарию А. и Б. Стругацких',
    theater: 'Московский театр Et Cetera',
    year: 2024,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/5f5667b5-350e-447c-a31b-f86c27bd3c85/5278352199782176823.jpg'
  },
  {
    slug: 'magicnutnutcracker',
    title: '«Волшебный орех. История Щелкунчика»',
    author: 'по Э.Т.А. Гофману',
    theater: 'Чувашский театр юного зрителя им. М. Сеспеля',
    year: 2024,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/b3b36fab-1b4d-480a-8de9-ce30dc9dc213/5208501660588641183.jpg'
  },
  {
    slug: 'remember',
    title: '«Помни»',
    author: 'спектакль-посвящение',
    theater: 'Краснодарский Молодёжный театр',
    year: 2024,
    status: 'live',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/b63bb167-e608-4ab8-ab37-c987a9145e8b/jRASGjgZyK2ICl-6P1fKvo1IoMQ-mXdTxtGcwTR960BJjHcqFBp-mGBp4z9cY5uJgNtHpJavxZu4ZHG5MPEBy3f1.jpg'
  },
  {
    slug: 'sorrowfromthemind',
    title: '«Горе от ума»',
    author: 'А.С. Грибоедов',
    theater: 'Краснодарский Молодёжный театр',
    year: 2024,
    status: 'live',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1738589675448-7FX31ZQC9RCUFU3TCQS5/5226898848054634031.jpg'
  },
  {
    slug: 'retrohbk',
    title: '«Ретро»',
    author: 'А. Галин',
    theater: 'Хабаровский театр юного зрителя',
    year: 2024,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1729333761186-NDKUNR0782UC9AYCXVPR/5242509310418869387.jpg'
  },
  {
    slug: 'kalleblomkvist',
    title: '«Калле Блюмквист — суперсыщик!»',
    author: 'по произведениям А. Линдгрен',
    theater: '«Ведогонь-театр» (Зеленоград, Москва)',
    year: 2023,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1701334450754-LBHDHQK003G3KX90T9ZR/photo1695841803.jpeg'
  },
  {
    slug: 'starfall',
    title: '«Звездопад»',
    author: 'по одноимённой повести В.П. Астафьева',
    theater: 'Русский драматический театр Башкортостана, г. Уфа',
    year: 2023,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1699192798098-QYQDSZI8NJGXX1V6V8UN/Poster.jpg'
  },
  {
    slug: 'scarletsails',
    title: '«Алые паруса»',
    author: 'П. Морозов по А. Грину',
    theater: 'Молодёжный Театр Алтая',
    year: 2023,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1680622373809-SY2LO8DIQCYEV8PCI32N/Scarlet+Sails.jpg'
  },
  {
    slug: 'babytimetalkshow',
    title: '«Мама, я — блогер!»',
    author: 'эскиз А. Стрижевской',
    theater: 'Проект «Открытая репетиция» Московского театра на Таганке',
    year: 2022,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1659444765026-TU1PICDV6XBRS02IPL0X/photo1659007695.jpeg'
  },
  {
    slug: 'thethreefatmen',
    title: '«Три толстяка»',
    author: 'по одноимённому роману для детей Ю.К. Олеши',
    theater: 'Молодёжный Театр Алтая',
    year: 2022,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1654959881420-AAGLAJBGIQQVAJ9MJXSU/IMG_9425.JPG'
  },
  {
    slug: 'theatrehistory',
    title: '«Театральная история»',
    author: '',
    theater: 'Московский областной театр драмы и комедии',
    year: 2022,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1654958636968-ODQKH4MAXMUB1XHCJHEA/1HmVogYw-LGAScqC5ledAh9mPaJape6vHddEloRMB_7zdPIRh8CHSteyvPU9C5DmI02blG6vN4TxwKwmjL2iHfOg.jpg'
  },
  {
    slug: 'babayagakids',
    title: '«Баба Яга против зла»',
    author: 'Ю. Бочарова',
    theater: 'Московский областной театр драмы и комедии',
    year: 2022,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1654958010838-G4TMYMWM8LFMQEMEMQDB/__.png'
  },
  {
    slug: 'babayagawoment',
    title: '«Женское счастье Бабы Яги»',
    author: 'Ю. Бочарова',
    theater: 'Московский областной театр драмы и комедии',
    year: 2022,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1654956619437-7FDCYC70UWARGMVTGZBF/__.png'
  },
  {
    slug: 'thewizardoftheemeraldcity',
    title: '«Волшебник Изумрудного города»',
    author: 'А. Богачёва по сказочной повести А. Волкова',
    theater: 'Екатеринбургский ТЮЗ',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623926255822-U82NCGE2UIOYJECDA2F0/The+Wiazrd+of+the+Emerald+City.jpg'
  },
  {
    slug: 'retro',
    title: '«Ретро»',
    author: 'А. Галин',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623913933240-A4EKJVCSK4HZ2ZNU2AJ0/Retro+poster.jpg'
  },
  {
    slug: 'thegoldenkey',
    title: '«Золотой ключик»',
    author: 'А.Н. Толстой',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623831351373-OC3MUVEIRAGKAQ32B303/the+golden+key.jpg'
  },
  {
    slug: 'warsawmelody',
    title: '«Варшавская мелодия»',
    author: 'Л.Г. Зорин',
    theater: 'Учебный театр ГИТИС',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623658351491-GP34L5Y5KMMQAQC0E5J9/Varshavskaya_afisha.jpg'
  },
  {
    slug: 'nutcracker',
    title: '«Щелкунчик»',
    author: 'Э.Т.А. Гофман',
    theater: 'Севастопольский академический драматический театр имени А.В. Луначарского',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623656506184-1U9LLJZUF1L0X36WZZKP/et-z9DIaS1E.jpg'
  },
  {
    slug: 'timurandhisteam',
    title: '«Тимур и его команда»',
    author: 'А.П. Гайдар',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623330167266-L29DRJF5BGXNLLDGK3LI/IMG_7611.jpg'
  },
  {
    slug: 'backtomurder',
    title: '«Назад к убийству»',
    author: 'А. Кристи',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623224836454-2WD04XTNHQW6K1F21U5I/1+1.jpg'
  },
  {
    slug: 'starboy',
    title: '«Звёздный мальчик»',
    author: 'О. Уайлд',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623222623835-ZAO4HGQGOB6IUV88SGA9/mal_15_na_9.jpg'
  },
  {
    slug: 'parodist',
    title: '«Пародист»',
    author: 'Е. Водолазкин',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623218243321-OQAD9EHTISME274A817A/IMG_4596.JPG'
  },
  {
    slug: 'acityinlove',
    title: 'Мюзикл «Влюблённый город»',
    author: '',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623152919120-WUTKLYC97ZQZS9PDS0GA/IMG_9816.jpg'
  },
  {
    slug: 'comedyoferrors',
    title: '«Комедия ошибок»',
    author: 'У. Шекспир',
    theater: 'Национальный драматический театр им. Б. Басангова',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623150701538-Y5SORLFSN7E1VEXYSM37/IMG_8872.JPEG'
  },
  {
    slug: 'zoikasappartament',
    title: '«Зойкина квартира»',
    author: 'М.А. Булгаков',
    theater: 'Национальный академический драматический театр им. Горького',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623131627423-ZP52CYJGF2AGZLL39TG0/IMG_8727.PNG'
  },
  {
    slug: 'intheceilingthestarsareshining',
    title: '«Звёзды светят на потолке»',
    author: 'Й. Тидель',
    theater: 'Краснодарский Молодёжный театр',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623130219628-O3EIVIPWVWO95M0JK9A8/IMG_4892.JPG'
  },
  {
    slug: 'gagarinway',
    title: '«Проезд Гагарина»',
    author: 'Г. Бёрк',
    theater: 'Русский театр Эстонии',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623053792042-OA554BPO7HULS0N2EKA1/555x800piletilevi2veneteater.jpg__800x1200_q85_crop_subsampling-2.jpg'
  },
  {
    slug: 'boyhood',
    title: '«Отрочество»',
    author: 'Я. Пулинович по Л.Н. Толстому',
    theater: 'Режиссёрский факультет ГИТИС',
    year: 2021,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623823516163-B03T2HH1PNB0M4RBOCOA/IMG_0284.PNG'
  }
];
