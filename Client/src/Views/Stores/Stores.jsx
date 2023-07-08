import style from "./Stores.module.css"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { getStores } from "../../redux/Actions/getStores";
import { useEffect } from "react";


const Stores = () => { 
    const stores = useSelector(state=>state.stores)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getStores())
    },[]);

    // aca te dejo la maps de la sucursal cerro ;) "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1239.8872003774427!2d-64.23481244745898!3d-31.356354645064446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329986ad6deb35%3A0x52fbc7df6bad6b40!2sPlaza%20Gran%20Malvina%20y%20Soledad!5e0!3m2!1ses-419!2sar!4v1688754926527!5m2!1ses-419!2sar"
   // maps de sucursal centro "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1238.9720209350585!2d-64.17738768021086!3d-31.42568822684169!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a296cb6bd8db%3A0xfb34f489eb01315!2zSmFyZMOtbiBBaW3DqSBCb25wbGFuZCDigJMgUGFzZW8gRnJhbmPDqXM!5e0!3m2!1ses-419!2sar!4v1688761955017!5m2!1ses-419!2sar"
   //barrio jardin "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2477.051925694272!2d-64.175913429319!3d-31.45943165512646!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a37a944dbcf1%3A0x52c0bd864d6f5d34!2sPlaza%20Carlos%20Argentino%20Garate!5e0!3m2!1ses-419!2sar!4v1688762038087!5m2!1ses-419!2sar"
   
   return (
    <div >
        <div className={style.title}> 
            <h1>Ubicaciones</h1>
            <h3>Contamos con {stores.length} sucursales disponibles</h3>
        </div>

        {stores.length!==0 ? stores.map((store)=>{
            return(
    <div  className={style.storeContainer}> 
         <div className={style.containerImage}>
           <img className={style.image} src={store.picture} alt="notFound" />
         </div>
         <div className={style.containerData}>
           <div className={style.data}>
            <p>Sucursal {store.id} "{store.name}"</p>
            <p>Dirección: {store.address}</p>
            <p>Teléfono: {store.phone}</p>
            <p>Email: {store.email}</p>
           </div>
        </div>
        <div className={style.map}>
         <iframe src={store.maps} width="450" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
    )}): (<p>Error: Sucursales no disponibles</p>)}

    <div><button className={style.backButton} ><NavLink to="/home">Volver</NavLink></button></div>
    </div>
    )
}

export default Stores;      