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
                  <Image src={`${process.env.PUBLIC_URL}/images/facebook.webp`}
                    height={30}
                    width={40}
                    rounded />
                </a>
                <a href='/' className='iconsLink'>
                  <Image src={`${process.env.PUBLIC_URL}/images/instagram.webp`}
                    height={30}
                    width={40}
                    rounded />
                </a>
                <a href='/' className='iconsLink'>
                  <Image src={`${process.env.PUBLIC_URL}/images/tik-tok.webp`}
                    height={30}
                    width={40}
                    rounded />
                </a>
              </div>
            </div>
            <Image src={`${process.env.PUBLIC_URL}/images/fon-footer.webp`} />
          </div>
          <div className='footerBotom'>
<div className='footerBotom__date'>&copy; sushi 2023</div>
<div className='footerBotom__autor'><small>autor</small> Ulich Igor</div>
          </div>
        </Container>
      </footer>
    )
  }

export default Footer;
