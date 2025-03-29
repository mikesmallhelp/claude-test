import { Henkilotiedot, Osoitetiedot, Luottokorttitiedot } from './types';

export function validoiHenkilotiedot(henkilotiedot: Partial<Henkilotiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!henkilotiedot.etunimi || henkilotiedot.etunimi.trim() === '') {
    virheet.etunimi = 'First name is required';
  }
  
  if (!henkilotiedot.sukunimi || henkilotiedot.sukunimi.trim() === '') {
    virheet.sukunimi = 'Last name is required';
  }
  
  if (!henkilotiedot.syntymaaika) {
    virheet.syntymaaika = 'Date of birth is required';
  } else {
    const dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
    if (!dateRegex.test(henkilotiedot.syntymaaika)) {
      virheet.syntymaaika = 'Date of birth must be in format dd.mm.yyyy';
    }
  }
  
  if (!henkilotiedot.sahkoposti) {
    virheet.sahkoposti = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(henkilotiedot.sahkoposti)) {
      virheet.sahkoposti = 'Email is not in the correct format';
    }
  }
  
  if (!henkilotiedot.puhelinnumero) {
    virheet.puhelinnumero = 'Phone number is required';
  } else {
    const phoneRegex = /^(\+?[0-9]{1,3})?[0-9]{6,14}$/;
    if (!phoneRegex.test(henkilotiedot.puhelinnumero.replace(/\s/g, ''))) {
      virheet.puhelinnumero = 'Phone number is not in the correct format';
    }
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}

export function validoiOsoitetiedot(osoitetiedot: Partial<Osoitetiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!osoitetiedot.katuosoite || osoitetiedot.katuosoite.trim() === '') {
    virheet.katuosoite = 'Street address is required';
  }
  
  if (!osoitetiedot.postinumero) {
    virheet.postinumero = 'Postal code is required';
  } else {
    // Finnish postal code is 5 digits
    const postinumeroRegex = /^\d{5}$/;
    if (!postinumeroRegex.test(osoitetiedot.postinumero)) {
      virheet.postinumero = 'Postal code must contain 5 digits';
    }
  }
  
  if (!osoitetiedot.paikkakunta || osoitetiedot.paikkakunta.trim() === '') {
    virheet.paikkakunta = 'City is required';
  }
  
  if (!osoitetiedot.maa || osoitetiedot.maa.trim() === '') {
    virheet.maa = 'Country is required';
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}

export function validoiLuottokorttitiedot(luottokorttitiedot: Partial<Luottokorttitiedot>): { validi: boolean; virheet: Record<string, string> } {
  const virheet: Record<string, string> = {};
  
  if (!luottokorttitiedot.nimikortissa || luottokorttitiedot.nimikortissa.trim() === '') {
    virheet.nimikortissa = 'Name on card is required';
  }
  
  if (!luottokorttitiedot.kortinnumero) {
    virheet.kortinnumero = 'Card number is required';
  } else {
    // Poista välilyönnit ja viivat
    const numero = luottokorttitiedot.kortinnumero.replace(/[\s-]/g, '');
    // Luottokorttinumero sisältää vain numeroita ja on 13-19 merkkiä pitkä
    const korttiRegex = /^\d{13,19}$/;
    if (!korttiRegex.test(numero)) {
      virheet.kortinnumero = 'Card number is not in the correct format';
    }
    
    // Luhn -algoritmi tarkistus voitaisiin myös toteuttaa tässä
  }
  
  if (!luottokorttitiedot.voimassaolo) {
    virheet.voimassaolo = 'Card expiration date is required';
  } else {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(luottokorttitiedot.voimassaolo)) {
      virheet.voimassaolo = 'Expiration date must be in format MM/YY';
    }
  }
  
  if (!luottokorttitiedot.cvv) {
    virheet.cvv = 'CVV code is required';
  } else {
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(luottokorttitiedot.cvv)) {
      virheet.cvv = 'CVV code must be 3-4 digits';
    }
  }
  
  if (!luottokorttitiedot.korttityyppi || luottokorttitiedot.korttityyppi.trim() === '') {
    virheet.korttityyppi = 'Card type is required';
  }
  
  return {
    validi: Object.keys(virheet).length === 0,
    virheet
  };
}