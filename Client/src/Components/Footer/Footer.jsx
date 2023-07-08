import style from '../Footer/Footer.module.css'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook-circular-logo.png'
import youtube from '../../assets/youtube.png'
import tiktok from '../../assets/tiktok.png'
import twitter from '../../assets/twitter.png'
import sportiverse2 from '../../assets/sportiverse2.png'

const Footer = () => {
  return (
    <div className={style.mainConatiner}>
      <div className={style.content}>

        <div className={style.box}>
          <h3 className={style.navlink}>¡Siguenos en nuestras redes sociales!</h3><br/>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={instagram} alt="Instagram" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={tiktok} alt="TikTok" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={twitter} alt="twitter" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.enlaceRedes} src={youtube} alt="YouTube" />
          </a>

        </div>

        <div className={style.box}>
          <h3>Conocenos</h3>
          <a
            href="https://www.linkedin.com/in/nadia-martel-admin/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Nadia Martel</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/leidy-johanna-s%C3%A1nchez-zamora-9370731a3/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Leidy Sánchez</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/juanpablomora61/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Juan Pablo Mora</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/luciano-velasquez-a73252269/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Luciano Velasquez</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/fabrizio-vettorelo-0629a3263/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Fabrizio Vettorelo</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/disof%C3%ADadubrowsky/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Sofía Dubrowsky</h3>
          </a>
          <a
            href="https://www.linkedin.com/in/gonzalo-schmidt-240903250/"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className={style.navlink}>Gonzalo Schmidt</h3>
          </a>
        </div>

        <div className={style.box}>
          <img src={sportiverse2} className={style.logo} />
        </div>

      </div>
    </div>
  )
}

export default Footer;