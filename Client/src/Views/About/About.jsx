import style from "./About.module.css"

const About = () => {
    return (
    <div>
        <div className={style.title}> 
            <h1>---Sobre nosotros---</h1>
        </div>
       
        <div  className={style.aboutContainer}> 
         <div className={style.containerImage}>
            <div className={style.bigImage}>contenedor de imagen</div>
            <div className={style.minimage}>
                <div className={style.image}>img1</div>
                <div className={style.image}>img2</div>
                <div className={style.image}>img3</div>  
            </div>
        </div>
        <div className={style.description}>
            <p>Esta es la informacion de la empresa</p>
        </div>
         </div>
    </div>
    )
}

export default About;