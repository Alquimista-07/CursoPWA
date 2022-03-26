export interface PaisInterface {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: Gini;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

interface PostalCode {
  format: string;
  regex: string;
}

interface CapitalInfo {
  latlng: number[];
}

interface CoatOfArms {
  png?: string;
  svg?: string;
}

interface Flags {
  png: string;
  svg: string;
}

interface Car {
  signs: string[];
  side: string;
}

interface Gini {
  '2018'?: number;
  '2019'?: number;
  '2014'?: number;
  '1999'?: number;
  '2017'?: number;
  '2006'?: number;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Translations {
  ara: Spa;
  ces: Spa;
  cym: Spa;
  deu: Spa;
  est: Spa;
  fin: Spa;
  fra: Spa;
  hrv: Spa;
  hun: Spa;
  ita: Spa;
  jpn: Spa;
  kor: Spa;
  nld: Spa;
  per: Spa;
  pol: Spa;
  por: Spa;
  rus: Spa;
  slk: Spa;
  spa: Spa;
  swe: Spa;
  urd: Spa;
  zho: Spa;
}

interface Languages {
  spa: string;
  grn?: string;
  aym?: string;
  que?: string;
  bjz?: string;
  eng?: string;
  fra?: string;
  por?: string;
  ber?: string;
  mey?: string;
  cha?: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface Currencies {
  MXN?: MXN;
  HNL?: MXN;
  UYU?: MXN;
  ARS?: MXN;
  PYG?: MXN;
  USD?: MXN;
  BOB?: MXN;
  NIO?: MXN;
  BZD?: MXN;
  PAB?: MXN;
  COP?: MXN;
  PEN?: MXN;
  CLP?: MXN;
  GTQ?: MXN;
  DOP?: MXN;
  CRC?: MXN;
  XAF?: MXN;
  CUC?: MXN;
  CUP?: MXN;
  DZD?: MXN;
  MAD?: MXN;
  MRU?: MXN;
  EUR?: MXN;
  VES?: MXN;
}

interface MXN {
  name: string;
  symbol: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  spa: Spa;
  grn?: Spa;
  aym?: Spa;
  que?: Spa;
  bjz?: Spa;
  eng?: Spa;
  fra?: Spa;
  por?: Spa;
  ber?: Spa;
  mey?: Spa;
  cha?: Spa;
}

interface Spa {
  official: string;
  common: string;
}