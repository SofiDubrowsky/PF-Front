import style from "./Stores.module.css"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";

const Stores = () => { 
    const stores = useSelector(state=>state.stores)

    return (
    <div >
        <div className={style.title}> 
            <h1>---Ubicación---</h1>
            <h3>___Contamos con {stores.length} sucursales disponibles___</h3>
        </div>

        {/* <p>-----aca iria un mapeo que renderice esto por cada sucursal:</p> */}
    <div  className={style.storeContainer}> 
         <div className={style.containerImage}>
           <img className={style.image} src="https://hoydia.com.ar/wp-content/uploads/2021/12/Jockey.jpg" alt="" />
         </div>
         <div className={style.containerData}>
           <div className={style.data}>
            <p>Sucursal 1 "Cerro norte"</p>
            <p>Dirección: Martin Fierro 4400 , Cordoba Argentina</p>
            <p>emailfalso@notreal.com</p>
            <p>tel: (054)00000-000000</p>
           </div>
        </div>
        <div className={style.map}>
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1239.8872003774427!2d-64.23481244745898!3d-31.356354645064446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329986ad6deb35%3A0x52fbc7df6bad6b40!2sPlaza%20Gran%20Malvina%20y%20Soledad!5e0!3m2!1ses-419!2sar!4v1688754926527!5m2!1ses-419!2sar" width="450" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
    <div><button className={style.backButton} ><NavLink to="/home">Volver</NavLink></button></div>
    </div>
    )
}

export default Stores;