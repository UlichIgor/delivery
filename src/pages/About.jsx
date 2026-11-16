// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  FaFish,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShoppingBasket,
  FaClipboardList,
  FaMotorcycle,
  FaUtensils,
  FaWhatsapp,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaUtensils />,
    title: "Обирайте улюблене",
    text: "Перегляньте меню Feast Sushi, знайдіть роли, сети та інші страви до свого смаку.",
  },
  {
    number: "02",
    icon: <FaShoppingBasket />,
    title: "Додавайте до кошика",
    text: "Зберіть замовлення з улюблених позицій та перевірте його склад і суму.",
  },
  {
    number: "03",
    icon: <FaClipboardList />,
    title: "Підтвердіть замовлення",
    text: "Зв’яжіться з менеджером, щоб узгодити адресу, доступність доставки та деталі.",
  },
  {
    number: "04",
    icon: <FaMotorcycle />,
    title: "Очікуйте доставку",
    text: "Менеджер повідомить актуальні умови та зорієнтує щодо подальшого виконання замовлення.",
  },
];

export default function About() {
  return (
    <main className="feast-about">
      <style>{`
        .feast-about { color: #f7f4ef; background: #111; overflow: hidden; }
        .feast-about .about-hero { position: relative; min-height: 440px; display: flex; align-items: center; background: linear-gradient(90deg, rgba(8,8,8,.94), rgba(8,8,8,.72), rgba(8,8,8,.25)), url("https://images.unsplash.com/photo-1579871494447-9811cf80d66f?auto=format&fit=crop&w=1800&q=85") center/cover; }
        .feast-about .hero-copy { max-width: 720px; padding: 76px 0; animation: feast-rise .8s ease both; }
        .feast-about .eyebrow { color: #d9a441; letter-spacing: .22em; text-transform: uppercase; font-size: .78rem; font-weight: 700; }
        .feast-about h1 { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.02; font-weight: 800; margin: 18px 0; }
        .feast-about h1 span { color: #e2ad4f; }
        .feast-about .hero-copy p { color: #e3ded5; font-size: 1.12rem; max-width: 610px; line-height: 1.8; }
        .feast-about .gold-btn { background: #d9a441; border-color: #d9a441; color: #17130c; font-weight: 700; padding: 12px 22px; }
        .feast-about .gold-btn:hover { background: #efbd62; border-color: #efbd62; color: #17130c; }
        .feast-about .about-section { padding: 76px 0; }
        .feast-about .section-kicker { color: #d9a441; text-transform: uppercase; letter-spacing: .18em; font-size: .75rem; font-weight: 700; }
        .feast-about .section-title { font-size: clamp(2rem, 4vw, 3.1rem); font-weight: 800; margin: 10px 0 18px; }
        .feast-about .muted-copy { color: #bdb8af; line-height: 1.85; font-size: 1.03rem; }
        .feast-about .value-card, .feast-about .step-card { height: 100%; padding: 28px; border: 1px solid #34312c; border-radius: 18px; background: linear-gradient(145deg,#1d1c19,#151515); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; }
        .feast-about .value-card:hover, .feast-about .step-card:hover { transform: translateY(-7px); border-color: #b98a37; box-shadow: 0 16px 36px rgba(0,0,0,.25); }
        .feast-about .icon-bubble { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 16px; background: rgba(217,164,65,.13); color: #e2ad4f; font-size: 1.45rem; margin-bottom: 20px; }
        .feast-about .value-card h3, .feast-about .step-card h3 { font-size: 1.2rem; font-weight: 750; margin-bottom: 10px; }
        .feast-about .value-card p, .feast-about .step-card p { color: #bdb8af; line-height: 1.7; margin: 0; }
        .feast-about .steps-wrap { position: relative; }
        .feast-about .step-number { color: #d9a441; font-weight: 800; letter-spacing: .12em; font-size: .8rem; margin-bottom: 15px; }
        .feast-about .step-icon { color: #e2ad4f; font-size: 1.5rem; margin-bottom: 14px; }
        .feast-about .step-card { animation: feast-rise .7s ease both; }
        .feast-about .step-card:nth-child(2) { animation-delay: .1s; }
        .feast-about .step-card:nth-child(3) { animation-delay: .2s; }
        .feast-about .step-card:nth-child(4) { animation-delay: .3s; }
        .feast-about .about-band { background: linear-gradient(115deg,#292116,#171512 70%); border-top: 1px solid #4a3920; border-bottom: 1px solid #4a3920; }
        .feast-about .about-band p { color: #d1c9bb; line-height: 1.8; }
        .feast-about .floating-sushi { position: absolute; right: 9%; bottom: 13%; font-size: clamp(3rem, 7vw, 6rem); opacity: .8; animation: feast-float 4s ease-in-out infinite; filter: drop-shadow(0 12px 20px rgba(0,0,0,.4)); }
        .feast-about .about-contact { padding: 38px; border-radius: 22px; border: 1px solid #514128; background: radial-gradient(circle at top right,rgba(217,164,65,.16),transparent 45%),#1b1a17; }
        .feast-about .about-contact a:not(.btn) { color: #e2ad4f; text-decoration: none; }
        @keyframes feast-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes feast-float { 0%,100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-17px) rotate(5deg); } }
        @media (max-width: 767px) { .feast-about .about-hero { min-height: 420px; background-position: 58% center; } .feast-about .about-section { padding: 54px 0; } .feast-about .floating-sushi { right: 5%; bottom: 4%; opacity: .25; } .feast-about .about-contact { padding: 25px; } }
        @media (prefers-reduced-motion: reduce) { .feast-about *, .feast-about *::before, .feast-about *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      <section className="about-hero">
        <Container className="position-relative">
          <div className="hero-copy">
            <div className="eyebrow">Feast Sushi · Чернігів</div>
            <h1>Смак, до якого <span>хочеться</span> повертатися</h1>
            <p>
              Feast Sushi — місце для тих, хто любить японську кухню та цінує
              можливість обрати улюблені смаки й замовити їх зручно онлайн.
            </p>
            <Button href="#/" className="gold-btn mt-3">Переглянути меню</Button>
          </div>
          <div className="floating-sushi" aria-hidden="true">🍣</div>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="section-kicker">Хто ми</div>
              <h2 className="section-title">Про Feast Sushi</h2>
              <p className="muted-copy">
                Ми створили цю сторінку, щоб знайомство з Feast Sushi було таким
                же простим, як вибір страв у меню. Тут ви можете переглянути
                асортимент, зібрати кошик і звернутися до менеджера для
                підтвердження замовлення.
              </p>
              <p className="muted-copy">
                Працюємо з замовленнями у Чернігові. Перед оформленням доставки
                менеджер допоможе уточнити, чи можемо привезти замовлення за
                вашою адресою, а також повідомить актуальні умови.
              </p>
            </Col>
            <Col lg={6}>
              <div className="rounded-4 overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1100&q=85"
                  alt="Асорті суші та ролів"
                  className="w-100"
                  style={{ display: "block", minHeight: 300, objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section pt-0">
        <Container>
          <div className="text-center mb-5">
            <div className="section-kicker">Наш підхід</div>
            <h2 className="section-title">Що важливо для нас</h2>
            <p className="muted-copy mx-auto" style={{ maxWidth: 650 }}>
              Зручний вибір, зрозуміла комунікація та увага до деталей на кожному етапі.
            </p>
          </div>
          <Row className="g-4">
            <Col md={4}>
              <Card className="value-card">
                <div className="icon-bubble"><FaFish /></div>
                <h3>Різноманіття смаків</h3>
                <p>У меню є роли, сети, поке, салати, супи, гарячі страви та напої.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <div className="icon-bubble"><FaHeart /></div>
                <h3>Зручність замовлення</h3>
                <p>Оберіть позиції в меню, додайте їх до кошика та підготуйте замовлення у кілька простих кроків.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="value-card">
                <div className="icon-bubble"><FaMapMarkerAlt /></div>
                <h3>Ми у Чернігові</h3>
                <p>Допоможемо перевірити можливість доставки за вашою адресою та повідомимо умови.</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section about-band">
        <Container>
          <div className="text-center mb-5">
            <div className="section-kicker">Як це працює</div>
            <h2 className="section-title">Від меню до вашого столу</h2>
            <p className="muted-copy mx-auto" style={{ maxWidth: 650 }}>
              Чотири зрозумілі кроки — від вибору страв до узгодження доставки з менеджером.
            </p>
          </div>
          <Row className="g-3 steps-wrap">
            {steps.map((step) => (
              <Col key={step.number} sm={6} lg={3}>
                <div className="step-card">
                  <div className="step-number">{step.number} / 04</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <div className="about-contact">
            <Row className="align-items-center g-4">
              <Col lg={8}>
                <div className="section-kicker">Будемо раді вашому замовленню</div>
                <h2 className="section-title mb-2">Обирайте улюблене у Feast Sushi</h2>
                <p className="mb-0 muted-copy">
                  Є питання щодо меню або доставки? Напишіть менеджеру — уточнимо деталі та допоможемо з оформленням.
                </p>
              </Col>
              <Col lg={4} className="d-flex flex-column gap-3">
                <Button href="https://wa.me/380688744734" target="_blank" rel="noopener noreferrer" className="gold-btn">
                  <FaWhatsapp className="me-2" /> Написати у WhatsApp
                </Button>
                <a href="tel:+380688744734"><FaPhoneAlt className="me-2" /> +38 (068) 874-47-34</a>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </main>
  );
}
