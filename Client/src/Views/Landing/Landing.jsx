import style from './Landing.module.css'
import { NavLink } from "react-router-dom";


const Landing = () => {
    return (
        <div>
            <div className={style.navBar}></div>
            <div className={style.gridContainer}>
                <div className={style.textContainer}>
                    <h1>SPORTIVERSE</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eius ipsa! Accusantium magni quidem ipsam error atque incidunt qui perspiciatis reprehenderit. Quasi alias, numquam eum optio quod doloribus illo voluptatum?</p>
                    <NavLink className={style.navlink} to={'/home'}>Busca tu actividad</NavLink>
                </div>
                <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.principalImg}/>
                <div className={style.imgContainer}>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                </div>
            </div>
            <div className={style.footer}></div>
            
        </div>
    )
}

export default Landing;