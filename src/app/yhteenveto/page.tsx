"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';

export default function YhteenvetoPage() {
  const router = useRouter();
  const { lomakedata } = useFormContext();
  
  // Kartan korttityypin arvoista suomenkielisiin nimiin
  const korttityyppiMap: Record<string, string> = {
    'visa': 'Visa',
    'mastercard': 'Mastercard',
    'amex': 'American Express',
    'diners': 'Diners Club'
  };
  
  // Country is now a free text field
  
  // Korttinumeron viimeisten 4 numeron näyttäminen
  const maskattuKorttinumero = lomakedata.luottokorttitiedot.kortinnumero
    ? `**** **** **** ${lomakedata.luottokorttitiedot.kortinnumero.slice(-4)}`
    : '';
  
  const aloitaAlusta = () => {
    router.push('/');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Name:</span> {lomakedata.henkilotiedot.etunimi} {lomakedata.henkilotiedot.sukunimi}</p>
              <p><span className="font-medium">Date of Birth:</span> {lomakedata.henkilotiedot.syntymaaika}</p>
              <p><span className="font-medium">Email:</span> {lomakedata.henkilotiedot.sahkoposti}</p>
              <p><span className="font-medium">Phone Number:</span> {lomakedata.henkilotiedot.puhelinnumero}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Address Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Street Address:</span> {lomakedata.osoitetiedot.katuosoite}</p>
              <p><span className="font-medium">Postal Code:</span> {lomakedata.osoitetiedot.postinumero}</p>
              <p><span className="font-medium">City:</span> {lomakedata.osoitetiedot.paikkakunta}</p>
              <p><span className="font-medium">Country:</span> {lomakedata.osoitetiedot.maa}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Payment Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Name on Card:</span> {lomakedata.luottokorttitiedot.nimikortissa}</p>
              <p><span className="font-medium">Card Type:</span> {korttityyppiMap[lomakedata.luottokorttitiedot.korttityyppi] || lomakedata.luottokorttitiedot.korttityyppi}</p>
              <p><span className="font-medium">Card Number:</span> {maskattuKorttinumero}</p>
              <p><span className="font-medium">Expiration Date:</span> {lomakedata.luottokorttitiedot.voimassaolo}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-green-600 font-medium mb-4">
              All information has been successfully saved!
            </p>
            
            <NavigationButtons
              backUrl="/luottokorttitiedot"
              onSubmit={aloitaAlusta}
              submitLabel="Start Over"
            />
          </div>
        </div>
      </section>
    </main>
  );
}