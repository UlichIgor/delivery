import { Button, Card, Container } from "react-bootstrap";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const DELIVERY_MESSAGE = encodeURIComponent(
  "Добрий день! Підкажіть, будь ласка, чи доставляєте за моєю адресою в Чернігові? Яка вартість і графік доставки?"
);

export default function Gallery() {
  return (
    <Container className="py-5">
      <div className="mx-auto" style={{ maxWidth: 820 }}>
        <h1 className="mb-3">Зона доставки Feast Sushi</h1>
        <p className="lead">
          Доставка у місті Чернігів. Можливість доставки до конкретної адреси
          потрібно попередньо підтвердити у менеджера.
        </p>
        <Card className="my-4 shadow-sm">
          <Card.Body className="p-4">
            <h2 className="h4">
              <FaMapMarkerAlt className="me-2" />
              Доставка по Чернігову
            </h2>
            <p>
              Щоб перевірити, чи обслуговуємо вашу вулицю та будинок, надішліть
              менеджеру повну адресу. Межі районів, вартість і години доставки
              поки не опубліковані, оскільки ці умови ще не підтверджені.
            </p>
            <p className="mb-3">
              Менеджер уточнить доступність доставки, її ціну та актуальний
              графік перед підтвердженням замовлення.
            </p>
            <Button
              as="a"
              href={`https://wa.me/380688744734?text=${DELIVERY_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="success"
            >
              <FaWhatsapp className="me-2" />
              Уточнити доставку у Чернігові
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
