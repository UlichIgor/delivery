import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaStar, FaRegStar, FaWhatsapp, FaCommentDots, FaHeart } from "react-icons/fa";

const MANAGER_PHONE = "380688744734";

export default function Blog() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [sent, setSent] = useState(false);

  const submitReview = (event) => {
    event.preventDefault();
    const message = [
      "Відгук для Feast Sushi",
      `Ім’я: ${name.trim() || "Не вказано"}`,
      `Оцінка: ${rating}/5`,
      `Відгук: ${review.trim()}`,
    ].join("\n");
    const url = `https://wa.me/${MANAGER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main className="feast-reviews">
      <style>{`
        .feast-reviews { min-height: 75vh; background: #111; color: #f7f4ef; padding: 62px 0 78px; }
        .feast-reviews .review-shell { max-width: 960px; margin: 0 auto; }
        .feast-reviews .review-kicker { color: #d9a441; text-transform: uppercase; letter-spacing: .2em; font-size: .76rem; font-weight: 750; }
        .feast-reviews .review-title { font-size: clamp(2.2rem,5vw,3.8rem); line-height: 1.08; font-weight: 850; margin: 13px 0 17px; }
        .feast-reviews .review-title span { color: #e2ad4f; }
        .feast-reviews .review-intro { color: #c5bfb4; max-width: 650px; line-height: 1.8; margin: 0 auto; }
        .feast-reviews .review-card { background: linear-gradient(145deg,#201f1b,#171717); border: 1px solid #49402f; border-radius: 22px; padding: clamp(22px,4vw,42px); box-shadow: 0 20px 55px rgba(0,0,0,.28); }
        .feast-reviews .form-label { color: #f3eadb; font-weight: 650; }
        .feast-reviews .form-control { background: #111; border: 1px solid #514b40; color: #fff; border-radius: 11px; padding: 12px 14px; }
        .feast-reviews .form-control:focus { background: #151412; color: #fff; border-color: #d9a441; box-shadow: 0 0 0 .2rem rgba(217,164,65,.14); }
        .feast-reviews .form-control::placeholder { color: #918b80; }
        .feast-reviews .rating-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .feast-reviews .rating-star { border: 0; background: transparent; color: #e2ad4f; font-size: 2rem; padding: 2px; transition: transform .18s ease; }
        .feast-reviews .rating-star:hover { transform: scale(1.18); }
        .feast-reviews .rating-caption { color: #c5bfb4; margin-left: 8px; }
        .feast-reviews .gold-submit { background: #d9a441; border-color: #d9a441; color: #17130c; font-weight: 750; padding: 12px 23px; border-radius: 10px; }
        .feast-reviews .gold-submit:hover { background: #efbd62; border-color: #efbd62; color: #17130c; }
        .feast-reviews .review-note { color: #a9a397; font-size: .88rem; line-height: 1.6; }
        .feast-reviews .thanks-panel { border: 1px solid #5d4a28; background: rgba(217,164,65,.1); border-radius: 13px; padding: 14px 16px; color: #f3dfb9; }
        .feast-reviews .benefit { height: 100%; padding: 22px; border-radius: 16px; background: #1a1916; border: 1px solid #35312a; }
        .feast-reviews .benefit-icon { color: #e2ad4f; font-size: 1.45rem; margin-bottom: 12px; }
        .feast-reviews .benefit h3 { font-size: 1.05rem; font-weight: 750; }
        .feast-reviews .benefit p { color: #bdb8af; line-height: 1.65; margin: 0; font-size: .94rem; }
        @media (prefers-reduced-motion: no-preference) { .feast-reviews .review-card { animation: review-in .65s ease both; } @keyframes review-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } } }
      `}</style>

      <Container className="review-shell">
        <header className="text-center mb-5">
          <div className="review-kicker">Feast Sushi · Чернігів</div>
          <h1 className="review-title">Нам важлива <span>ваша думка</span></h1>
          <p className="review-intro">
            Поділіться враженнями від Feast Sushi. Ваш відгук допомагає нам краще
            розуміти ваші побажання та ставати кращими.
          </p>
        </header>

        <Row className="g-4 align-items-stretch">
          <Col lg={8}>
            <section className="review-card">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-circle d-grid place-items-center" style={{ width: 48, height: 48, background: "rgba(217,164,65,.14)", color: "#e2ad4f", fontSize: 21 }}>
                  <FaCommentDots />
                </div>
                <div>
                  <h2 className="h4 mb-1 fw-bold">Залишити відгук</h2>
                  <div className="review-note">Розкажіть, що вам сподобалося</div>
                </div>
              </div>

              <Form onSubmit={submitReview}>
                <Form.Group className="mb-3" controlId="reviewName">
                  <Form.Label>Ваше ім’я <span className="review-note">(необов’язково)</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Як до вас звертатися?"
                    maxLength={60}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Оцініть ваше враження</Form.Label>
                  <div className="rating-row" role="group" aria-label="Оцінка від одного до п’яти">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className="rating-star"
                        onClick={() => setRating(value)}
                        aria-label={`Оцінка ${value} з 5`}
                        aria-pressed={rating === value}
                      >
                        {value <= rating ? <FaStar /> : <FaRegStar />}
                      </button>
                    ))}
                    <span className="rating-caption">{rating} з 5</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="reviewText">
                  <Form.Label>Ваш відгук</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    required
                    minLength={5}
                    maxLength={1200}
                    value={review}
                    onChange={(event) => { setReview(event.target.value); setSent(false); }}
                    placeholder="Поділіться враженнями про страви, сервіс або доставку..."
                  />
                  <div className="review-note text-end mt-1">{review.length}/1200</div>
                </Form.Group>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                  <Button type="submit" className="gold-submit" disabled={review.trim().length < 5}>
                    <FaWhatsapp className="me-2" /> Надіслати відгук
                  </Button>
                  <span className="review-note">Відгук відкриється у WhatsApp для надсилання менеджеру.</span>
                </div>
                {sent && (
                  <div className="thanks-panel mt-3" role="status">
                    Дякуємо! Відкрили WhatsApp із підготовленим повідомленням. Натисніть «Надіслати» у WhatsApp, щоб передати відгук менеджеру.
                  </div>
                )}
              </Form>
            </section>
          </Col>

          <Col lg={4}>
            <div className="d-flex flex-column gap-3 h-100">
              <div className="benefit">
                <div className="benefit-icon"><FaHeart /></div>
                <h3>Дякуємо за довіру</h3>
                <p>Кожна думка важлива для команди Feast Sushi — і позитивна, і та, що допомагає нам виправляти недоліки.</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon"><FaStar /></div>
                <h3>Оцініть свій досвід</h3>
                <p>Поставте від однієї до п’яти зірок та напишіть кілька слів про ваше замовлення.</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon"><FaWhatsapp /></div>
                <h3>Зворотний зв’язок</h3>
                <p>Ваше повідомлення буде підготовлене у WhatsApp — його потрібно буде надіслати вручну.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
