import Header from "./Header";
import ContactSection from "./ContactSection";
import ServicesSection from "./ServicesSection"

import mainPhoto from "./img/main.jpg"
import Image from "./Image";

function App() {
  const imageStyle = {
    width: "50%"
  };

  return (
    <>
      <Header content={'Adriel Molk'} size={80}/> 
      <Header content={'How can I help meet your needs?'} size={30}/>
      <Image src={mainPhoto} imgStyle={imageStyle}/>
      <ServicesSection />
      <ContactSection />
    </>
  );
}

export default App;
