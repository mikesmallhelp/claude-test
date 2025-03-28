"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import NavigationButtons from '@/components/NavigationButtons';
import { useFormContext } from '@/lib/FormContext';
import { validoiOsoitetiedot } from '@/lib/validointi';
import { Osoitetiedot } from '@/lib/types';


export default function OsoitetiedotPage() {
  const router = useRouter();
  const { lomakedata, setOsoitetiedot } = useFormContext();
  
  const [osoitetiedot, setOsoitetiedotState] = useState<Osoitetiedot>(lomakedata.osoitetiedot);
  const [virheet, setVirheet] = useState<Record<string, string>>({});
  const [koskettu, setKoskettu] = useState<Record<string, boolean>>({});
  const [validi, setValidi] = useState(false);
  
  useEffect(() => {
    const validointiTulos = validoiOsoitetiedot(osoitetiedot);
    setValidi(validointiTulos.validi);
    
    // Näytä virheet vain kosketuille kentille
    const naytettavatVirheet: Record<string, string> = {};
    Object.keys(validointiTulos.virheet).forEach(kentta => {
      if (koskettu[kentta]) {
        naytettavatVirheet[kentta] = validointiTulos.virheet[kentta];
      }
    });
    
    setVirheet(naytettavatVirheet);
  }, [osoitetiedot, koskettu]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOsoitetiedotState(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setKoskettu(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const seuraavaSivu = () => {
    // Tallenna tiedot context:iin ennen seuraavalle sivulle siirtymistä
    setOsoitetiedot(osoitetiedot);
    router.push('/credit_card_info');
  };
  
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Address Information</h2>
          
          <InputField 
            id="katuosoite"
            label="Street Address"
            value={osoitetiedot.katuosoite}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.katuosoite}
            required
          />
          
          <InputField 
            id="postinumero"
            label="Postal Code"
            value={osoitetiedot.postinumero}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.postinumero}
            required
          />
          
          <InputField 
            id="paikkakunta"
            label="City"
            value={osoitetiedot.paikkakunta}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.paikkakunta}
            required
          />
          
          <InputField 
            id="maa"
            label="Country"
            value={osoitetiedot.maa}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={virheet.maa}
            required
          />
          
          <NavigationButtons
            backUrl="/personal_info"
            onSubmit={validi ? seuraavaSivu : undefined}
            disableNext={!validi}
            submitLabel="Next"
          />
        </div>
      </section>
    </main>
  );
}