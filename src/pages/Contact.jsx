// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaClock, FaInstagram, FaPaperPlane } from "react-icons/fa";

const MANAGER_PHONE = "380688744734";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", topic: "Питання щодо замовлення", message: "" });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    const text = [
      "Повідомлення з сайту Feast Sushi",
      "Ім'я: " + form.name,
      "Телефон: " + form.phone,
      "Тема: " + form.topic,
      "Повідомлення: " + form.message
    ].join("\n");
    window.open("https://wa.me/" + MANAGER_PHONE + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="contact-page py-5">
      <Container>
        <div className="text-center mb-5">
          <p className="text-uppercase text-muted mb-2">Feast Sushi</p>
          <h1 className="fw-bold">Контакти</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: 620 }}>
            Ми на зв&apos;язку та готові допомогти з вибором страв, оформленням замовлення
            або відповідями на ваші запитання.
          </p>
        </div>

        <Row className="g-4 align-items-stretch">
          <Col lg={5}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h3 className="h4 fw-bold mb-4">Як з нами зв&apos;язатися</h3>
                <div className="d-flex gap-3 mb-4">
                  <div className="text-danger fs-4"><FaPhoneAlt /></div>
                  <div>
                    <div className="fw-semibold">Телефон для замовлень</div>
                    <a className="text-decoration-none" href="tel:+380688744734">+38 (068) 874-47-34</a>
                    <div className="small text-muted">Зателефонуйте менеджеру</div>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4">
                  <div className="text-success fs-4"><FaWhatsapp /></div>
                  <div>
                    <div className="fw-semibold">WhatsApp</div>
                    <a className="text-decoration-none" href={"https://wa.me/" + MANAGER_PHONE} target="_blank" rel="noreferrer">Написати менеджеру</a>
                    <div className="small text-muted">Замовлення та консультації</div>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4">
                  <div className="text-danger fs-4"><FaMapMarkerAlt /></div>
                  <div>
                    <div className="fw-semibold">Місто</div>
                    <div>Чернігів, Україна</div>
                    <div className="small text-muted">Уточніть адресу доставки у менеджера</div>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="text-danger fs-4"><FaClock /></div>
                  <div>
                    <div className="fw-semibold">Графік роботи</div>
                    <div>Актуальний графік уточнюйте у менеджера</div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="fw-semibold mb-2">Слідкуйте за нами</div>
                <a className="btn btn-outline-danger rounded-pill" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  <FaInstagram className="me-2" /> Instagram
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h3 className="h4 fw-bold mb-2">Напишіть нам</h3>
                <p className="text-muted mb-4">Заповніть форму — повідомлення відкриється у WhatsApp менеджера.</p>
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3" controlId="contactName">
                    <Form.Label>Ваше ім&apos;я</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={update} placeholder="Як до вас звертатися?" required maxLength={80} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contactPhone">
                    <Form.Label>Номер телефону</Form.Label>
                    <Form.Control name="phone" type="tel" value={form.phone} onChange={update} placeholder="+380..." required maxLength={30} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contactTopic">
                    <Form.Label>Тема звернення</Form.Label>
                    <Form.Select name="topic" value={form.topic} onChange={update}>
                      <option>Питання щодо замовлення</option>
                      <option>Доставка</option>
                      <option>Меню та склад страв</option>
                      <option>Співпраця</option>
                      <option>Інше</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="contactMessage">
                    <Form.Label>Повідомлення</Form.Label>
                    <Form.Control as="textarea" rows={5} name="message" value={form.message} onChange={update} placeholder="Напишіть ваше запитання..." required maxLength={1000} />
                    <Form.Text muted>{form.message.length}/1000 символів</Form.Text>
                  </Form.Group>
                  <Button type="submit" variant="danger" size="lg" className="w-100 rounded-pill">
                    <FaPaperPlane className="me-2" /> Надіслати повідомлення
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <p className="text-center text-muted small mt-4 mb-0">
          Натискаючи «Надіслати повідомлення», ви перейдете до WhatsApp для відправлення звернення менеджеру.
        </p>
      </Container>
    </main>
  );
}
