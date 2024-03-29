import { registerEnumType } from '@nestjs/graphql'

export enum Language {
  Afrikaans = 'Afrikaans',
  Albanian = 'Albanian',
  Amharic = 'Amharic',
  Arabic = 'Arabic',
  Aramaic = 'Aramaic',
  Armenian = 'Armenian',
  Assamese = 'Assamese',
  Aymara = 'Aymara',
  Azerbaijani = 'Azerbaijani',
  Balochi = 'Balochi',
  Bamanankan = 'Bamanankan',
  BashkortBashkir = 'BashkortBashkir',
  Basque = 'Basque',
  Belarusan = 'Belarusan',
  Bengali = 'Bengali',
  Bhojpuri = 'Bhojpuri',
  Bislama = 'Bislama',
  Bosnian = 'Bosnian',
  Brahui = 'Brahui',
  Bulgarian = 'Bulgarian',
  Burmese = 'Burmese',
  Cantonese = 'Cantonese',
  Catalan = 'Catalan',
  Cebuano = 'Cebuano',
  Chechen = 'Chechen',
  Cherokee = 'Cherokee',
  Croatian = 'Croatian',
  Czech = 'Czech',
  Dakota = 'Dakota',
  Danish = 'Danish',
  Dari = 'Dari',
  Dholuo = 'Dholuo',
  Dutch = 'Dutch',
  English = 'English',
  Esperanto = 'Esperanto',
  Estonian = 'Estonian',
  Ewe = 'Ewe',
  Finnish = 'Finnish',
  French = 'French',
  Georgian = 'Georgian',
  German = 'German',
  Gikuyu = 'Gikuyu',
  Greek = 'Greek',
  Guarani = 'Guarani',
  Gujarati = 'Gujarati',
  HaitianCreole = 'HaitianCreole',
  Hausa = 'Hausa',
  Hawaiian = 'Hawaiian',
  HawaiianCreole = 'HawaiianCreole',
  Hebrew = 'Hebrew',
  Hiligaynon = 'Hiligaynon',
  Hindi = 'Hindi',
  Hungarian = 'Hungarian',
  Icelandic = 'Icelandic',
  Igbo = 'Igbo',
  Ilocano = 'Ilocano',
  IndonesianBahasaIndonesia = 'IndonesianBahasaIndonesia',
  InuitInupiaq = 'InuitInupiaq',
  IrishGaelic = 'IrishGaelic',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Jarai = 'Jarai',
  Javanese = 'Javanese',
  Kiche = 'Kiche',
  Kabyle = 'Kabyle',
  Kannada = 'Kannada',
  Kashmiri = 'Kashmiri',
  Kazakh = 'Kazakh',
  Khmer = 'Khmer',
  Khoekhoe = 'Khoekhoe',
  Korean = 'Korean',
  Kurdish = 'Kurdish',
  Kyrgyz = 'Kyrgyz',
  Lao = 'Lao',
  Latin = 'Latin',
  Latvian = 'Latvian',
  Lingala = 'Lingala',
  Lithuanian = 'Lithuanian',
  Macedonian = 'Macedonian',
  Maithili = 'Maithili',
  Malagasy = 'Malagasy',
  MalayBahasaMelayu = 'MalayBahasaMelayu',
  Malayalam = 'Malayalam',
  MandarinChinese = 'MandarinChinese',
  Marathi = 'Marathi',
  Mende = 'Mende',
  Mongolian = 'Mongolian',
  Nahuatl = 'Nahuatl',
  Navajo = 'Navajo',
  Nepali = 'Nepali',
  Norwegian = 'Norwegian',
  Ojibwa = 'Ojibwa',
  Oriya = 'Oriya',
  Oromo = 'Oromo',
  Pashto = 'Pashto',
  Persian = 'Persian',
  Polish = 'Polish',
  Portuguese = 'Portuguese',
  Punjabi = 'Punjabi',
  Quechua = 'Quechua',
  Romani = 'Romani',
  Romanian = 'Romanian',
  Russian = 'Russian',
  Rwanda = 'Rwanda',
  Samoan = 'Samoan',
  Sanskrit = 'Sanskrit',
  Serbian = 'Serbian',
  Shona = 'Shona',
  Sindhi = 'Sindhi',
  Sinhala = 'Sinhala',
  Slovak = 'Slovak',
  Slovene = 'Slovene',
  Somali = 'Somali',
  Spanish = 'Spanish',
  Swahili = 'Swahili',
  Swedish = 'Swedish',
  Tachelhit = 'Tachelhit',
  Tagalog = 'Tagalog',
  Tajiki = 'Tajiki',
  Tamil = 'Tamil',
  Tatar = 'Tatar',
  Telugu = 'Telugu',
  Thai = 'Thai',
  TibeticLanguages = 'TibeticLanguages',
  Tigrigna = 'Tigrigna',
  TokPisin = 'TokPisin',
  Turkish = 'Turkish',
  Turkmen = 'Turkmen',
  Ukrainian = 'Ukrainian',
  Urdu = 'Urdu',
  Uyghur = 'Uyghur',
  Uzbek = 'Uzbek',
  Vietnamese = 'Vietnamese',
  Warlpiri = 'Warlpiri',
  Welsh = 'Welsh',
  Wolof = 'Wolof',
  Xhosa = 'Xhosa',
  Yakut = 'Yakut',
  Yiddish = 'Yiddish',
  Yoruba = 'Yoruba',
  Yucatec = 'Yucatec',
  Zapotec = 'Zapotec',
  Zulu = 'Zulu',
}

registerEnumType(Language, { name: 'Language' })
