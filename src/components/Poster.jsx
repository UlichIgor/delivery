import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function Poster() {
  return (
    
      <Container fluid className="Poster">
        <Carousel>
          <Carousel.Item>
          <Image className="d-block w-100" src="./images/poster1.webp" alt="First slide" />
            <Carousel.Caption className="PosterBlock">
              <div className="Poster__title">
                <h3>гігасет 2000г три дракони та три філадельфії</h3>
              </div>
              <div className="Poster__descr">
                <p>Подарункова упаковка та скляна тортниця</p>
              </div>
              <Button className="Poster__btn" variant="light">Замовити</Button>{" "} 
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <Image className="d-block w-100" src="./images/poster2.webp" alt="Second slide" />

            <Carousel.Caption className="PosterBlock">
              <div className="Poster__title"><h3>Гранд Філадельфія</h3></div>
              <div className="Poster__descr"><p>Скуштуй новий салат</p></div>
              <Button className="Poster__btn" variant="light">Замовити</Button>{" "}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

  );
}

export default Poster;
