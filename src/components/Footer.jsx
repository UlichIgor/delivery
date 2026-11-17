import { Container, Image } from "react-bootstrap";

function Footer() {
  return (
    <footer className='footer'>
      <Container fluid>
        <div className='footerFirst'>
          <div className='footerFirst__content'>
            <div className='footerFirst__content_title'>
              <h5>Ми в соцмережах</h5>
            </div>
            <div className='footerFirst__content_icons'>
              <a href='/' className='iconsLink'>
                <Image
                  // eslint-disable-next-line no-undef
                  src={`${process.env.PUBLIC_URL}/images/facebook.webp`}
                  alt='Facebook'
                  height={40}
                  width={40}
                  rounded
                />
              </a>
              <a href='/' className='iconsLink'>
                <Image
                  // eslint-disable-next-line no-undef
                  src={`${process.env.PUBLIC_URL}/images/instagram.webp`}
                  alt='Instagram'
                  height={40}
                  width={40}
                  rounded
                />
              </a>
              <a href='/' className='iconsLink'>
                <Image
                  // eslint-disable-next-line no-undef
                  src={`${process.env.PUBLIC_URL}/images/tik-tok.webp`}
                  alt='TikTok'
                  height={40}
                  width={40}
                  rounded
                />
              </a>
            </div>
          </div>
          <Image
            // eslint-disable-next-line no-undef
            src={`${process.env.PUBLIC_URL}/images/fon-footer.webp`}
            alt=''
          />
        </div>
        <div className='footerBotom'>
          <div className='footerBotom__date'>&copy; sushi 2026</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
