import Header from "./Header";
import mainPhoto from "../src/img/main.jpg"
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
    </>
  );
}

export default App;
