import style from './Landing.module.css'

const Landing = () => {
    return (
        <div>
            <nav className={style.navBar}></nav>
            <div className={style.gridContainer}>
                <div className={style.textContainer}>
                    <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eius ipsa! Accusantium magni quidem ipsam error atque incidunt qui perspiciatis reprehenderit. Quasi alias, numquam eum optio quod doloribus illo voluptatum?</p>
                    <button className={style.buttonEnter}>Busca tu actividad</button>
                </div>
                <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.principalImg}/>
                <div className={style.imgContainer}>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                    <img src="https://www.touchtaiwan.com/images/default.jpg" alt="" className={style.secondaryImg}/>
                </div>
            </div>
            <footer className={style.footer}></footer>
        </div>
    )
}

export default Landing;