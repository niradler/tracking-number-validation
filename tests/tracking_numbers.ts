import { CourierName } from '../src/couriers/types';

export const trackingNumbers: Record<string, string> = {
  // TEST UPS
  "1Z9999W99999999999": CourierName.UPS,
  "1Z12345E1512345676": CourierName.UPS,
  "1Z12345E0205271688": CourierName.UPS,
  "1Z12345E6605272234": CourierName.UPS,
  "1Z12345E0305271640": CourierName.UPS,
  "1Z12345E0393657226": CourierName.UPS,
  "1Z12345E1305277940": CourierName.UPS,
  "1Z12345E6205277936": CourierName.UPS,
  "1Z12345E1505270452": CourierName.UPS,
  "1Z648616E192760718": CourierName.UPS,
  "1ZWX0692YP40636269": CourierName.UPS,
  "1Z5R89390357567127": CourierName.UPS,
  "1Z999AA10123456784": CourierName.UPS,
  "1Z12345E0291980793": CourierName.UPS,
  "1Z12345E0390000000": CourierName.UPS,
  "1Z12345E0193663003": CourierName.UPS,
  "1Z12345E1592740435": CourierName.UPS,
  "1Z12345E0392751591": CourierName.UPS,
  "1Z12345E0391203790": CourierName.UPS,
  "1ZW123W50396830959": CourierName.UPS,
  "1Z12345E5991872040": CourierName.UPS,
  "H1234567890": CourierName.UPS,
  "T9999999999": CourierName.UPS,
  "92748963438592543475924253": CourierName.UPS,

  // TEST FEDEX
  "999999999999": CourierName.FEDEX, // 12-digit format
  "999999999999999": CourierName.FEDEX, // 15-digit format
  "661377569221": CourierName.FEDEX,
  "624893691092": CourierName.FEDEX,
  "61299995669352455464": CourierName.FEDEX, // 20-digit format
  "61299995669151880177": CourierName.FEDEX, // 20-digit format
  "986578788855": CourierName.FEDEX,
  "785497888855": CourierName.FEDEX,
  "041441760228964": CourierName.FEDEX,
  "041214818299353": CourierName.FEDEX,
  "96122987654312345678": CourierName.FEDEX, // FedEx Smartpost
  "96149012384931234567": CourierName.FEDEX, // FedEx Smartpost
  "961290448662710": CourierName.FEDEX, // FedEx Smartpost
  "100123456789012345": CourierName.FEDEX,
  "874512345678": CourierName.FEDEX,
  "397812345678": CourierName.FEDEX,
  "000123456789000": CourierName.FEDEX,
  "123456789012": CourierName.FEDEX,
  "987654321098": CourierName.FEDEX,
  "111222333444": CourierName.FEDEX,
  "555666777888": CourierName.FEDEX,
  "999000111222": CourierName.FEDEX,
  "9622080430002481027200399594546820": CourierName.FEDEX, // 34-digit format

  // TEST USPS
  "9400100000000000000000": CourierName.USPS, // 22 digits
  "9205500000000000000000": CourierName.USPS, // 22 digits
  "9407300000000000000000": CourierName.USPS, // 22 digits
  "9303300000000000000000": CourierName.USPS, // 22 digits
  "8200000000": CourierName.USPS, // 10 digits
  "EC000000000US": CourierName.USPS, // 13 characters
  "9270100000000000000000": CourierName.USPS, // 22 digits
  "EA000000000US": CourierName.USPS, // 13 characters
  "CP000000000US": CourierName.USPS, // 13 characters
  "9208800000000000000000": CourierName.USPS, // 22 digits
  "9202100000000000000000": CourierName.USPS, // 22 digits
  "9500100000000000000000": CourierName.USPS, // 22 digits
  "9400111201080805483016": CourierName.USPS, // 22 digits
  "9305500000000000000000": CourierName.USPS, // 22 digits
  "9505500000000000000000": CourierName.USPS, // 22 digits
  "420100019400111201080805483016": CourierName.USPS, // Intelligent Mail Package Barcode
  "EE123456789US": CourierName.USPS, // 13 characters
  "CP123456789US": CourierName.USPS, // 13 characters
  "RA123456789US": CourierName.USPS, // 13 characters

  // TEST ONTRAC
  "C10999911320231": CourierName.ONTRAC, // 15 characters, starts with C
  "C11432071350583": CourierName.ONTRAC,
  "C12345678901238": CourierName.ONTRAC,
  "C98765432109873": CourierName.ONTRAC,
  "C55544433322214": CourierName.ONTRAC,
  "D10902001187180": CourierName.ONTRAC, // 15 characters, starts with D
  "D12345678901237": CourierName.ONTRAC,
  "D98765432109872": CourierName.ONTRAC,
  "D11122233344457": CourierName.ONTRAC,
  "D99988877766652": CourierName.ONTRAC,
  "C10000000000018": CourierName.ONTRAC,
  "D10000000000017": CourierName.ONTRAC,
  "1LS000111222333": CourierName.ONTRAC, // 15 characters, starts with 1LS
  "1LS999888777666": CourierName.ONTRAC,
  "1LS123456789012": CourierName.ONTRAC,
  "LX12345678": CourierName.ONTRAC, // 10 characters, starts with LX
  "LX98765432": CourierName.ONTRAC,
  "LX00001111": CourierName.ONTRAC,
  "LX99998888": CourierName.ONTRAC,
  "LA12345678": CourierName.ONTRAC,
  "LB12345678": CourierName.ONTRAC,
  "LC12345678": CourierName.ONTRAC,

  // TEST DHL
  "1251234567": CourierName.DHL, // 10-digit Express format
  "3318810025": CourierName.DHL, // 10-digit Express format
  "1234567896": CourierName.DHL, // 10-digit Express format
  "1111111116": CourierName.DHL, // 10-digit Express format
  "2222222220": CourierName.DHL, // 10-digit Express format
  "6666666663": CourierName.DHL, // 10-digit Express format
  "7777777774": CourierName.DHL, // 10-digit Express format
  "GM2951173225174494": CourierName.DHL, // eCommerce format
  "ABC1234567": CourierName.DHL, // Global Forwarding format
  "SEA1234567": CourierName.DHL, // Global Forwarding format
  "LAX1234567": CourierName.DHL, // Global Forwarding format

  // TEST AMAZON
  "TBA502887274000": CourierName.AMAZON, // Amazon Logistics (AMZL_US)
  "TBA487064622000": CourierName.AMAZON,
  "TBA123456789012": CourierName.AMAZON,
  "TBA000111222333": CourierName.AMAZON,
  "TBA999888777666": CourierName.AMAZON,
  "TBC000111222333": CourierName.AMAZON,
  "TBC123456789012": CourierName.AMAZON,
  "TBC987654321098": CourierName.AMAZON,
  "TBM111222333444": CourierName.AMAZON,
  "TBM555666777888": CourierName.AMAZON,
  "TBD999000111222": CourierName.AMAZON,
  "TBA100200300400": CourierName.AMAZON,
  "TBC500600700800": CourierName.AMAZON,
  "AZ12345678901234567890123456": CourierName.AMAZON, // Amazon Logistics (AMZL_US)
  "ZA12345678901234567890123456": CourierName.AMAZON, // Amazon Logistics (AMZL_US)

  // TEST LASERSHIP (now ONTRAC)
  // Lasership and OnTrac have merged and are identified as ONTRAC.
  // Their tracking numbers (1LS, LX, etc.) now fall under the ONTRAC category.
  // The numbers have been moved and validated under the ONTRAC section.

  // TEST CANADA POST
  "RP123456789CA": CourierName.CANADA_POST, // 13 alphanumeric
  "1234567890123": CourierName.CANADA_POST, // 13 numeric
  "5035144199183281": CourierName.CANADA_POST, // 16 numeric
  "1234567890123456": CourierName.CANADA_POST, // 16 numeric
  "9999888877776666": CourierName.CANADA_POST, // 16 numeric
  "0000111122223333": CourierName.CANADA_POST, // 16 numeric
  "1010101010101010": CourierName.CANADA_POST, // 16 numeric
  "LM123456789CA": CourierName.CANADA_POST, // 13 alphanumeric
  "EE123456785CA": CourierName.CANADA_POST, // 13 alphanumeric
  "CP123456785CA": CourierName.CANADA_POST, // 13 alphanumeric
  "RA123456785CA": CourierName.CANADA_POST, // 13 alphanumeric
  "CA123456785CA": CourierName.CANADA_POST, // 13 alphanumeric
  "9876543210123": CourierName.CANADA_POST, // 13 numeric

  // TEST ROYAL MAIL
  "XF133641044GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "AB123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "RR123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "CP123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "EE123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "KF123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "PB123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "CX123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "LZ123456785GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "JV620553954GB": CourierName.ROYAL_MAIL, // 13 alphanumeric, ends in GB
  "050111C31F4": CourierName.ROYAL_MAIL, // 11 alphanumeric
  "32048619500001B3A6F40": CourierName.ROYAL_MAIL, // 21 alphanumeric
  "0210DAD9015248A2": CourierName.ROYAL_MAIL, // 16 alphanumeric
  "0B0480284000010307090": CourierName.ROYAL_MAIL, // 21 alphanumeric

  // TEST AUSTRALIA POST
  "EE123456785AU": CourierName.AUSTRALIA_POST, // 13 alphanumeric, ends in AU
  "RR123456785AU": CourierName.AUSTRALIA_POST, // 13 alphanumeric, ends in AU
  "CP123456785AU": CourierName.AUSTRALIA_POST, // 13 alphanumeric, ends in AU
  "TMABC12312345678900405092": CourierName.AUSTRALIA_POST, // Domestic letter with tracking Imprint

  // TEST CHINA POST
  "EE123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "RR123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "CP123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "LK123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "RI123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "UA123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "SF123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "CX123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "RX123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "LZ123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "LN123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
  "LP123456785CN": CourierName.CHINA_POST, // 13 alphanumeric, ends in CN
};