import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Objects",
  description: "Menu where you can find your personal object",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Find Objects"
        description="Avant d'acheter un appareil électronique de seconde main, utilisez notre outil de vérification pour savoir si l'objet est déclaré volé. Protégez-vous et faites des achats en toute sécurité avec GoFind"
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
