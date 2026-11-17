import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function Poster() {
  return (
    <Container fluid className="Poster">
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/images/poster1.webp`}
            alt="Асорті ролів Feast Sushi"
          />
          <Carousel.Caption className="PosterBlock">
            <div className="Poster__title">
              <h2>Гігасет 2000 г: «Три дракони» та «Три Філадельфії»</h2>
            </div>
            <div className="Poster__descr">
              <p>Подарункова упаковка та скляна тортниця</p>
            </div>
            <Button className="Poster__btn" variant="light" onClick={scrollToMenu}>
              Переглянути меню
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/images/poster2.webp`}
            alt="Роли та страви Feast Sushi"
          />
          <Carousel.Caption className="PosterBlock">
            <div className="Poster__title"><h2>Гранд Філадельфія</h2></div>
            <div className="Poster__descr">
              <p>Обирайте роли, сети та інші улюблені страви</p>
            </div>
            <Button className="Poster__btn" variant="light" onClick={scrollToMenu}>
              Переглянути меню
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Poster;
