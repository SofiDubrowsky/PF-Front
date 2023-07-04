import CalendarComponent from "../../Components/Calendar/Calendar"
const Detail = () => {
    return (
    <div>
        <div>
            <h3>Nombre de actividad</h3>
        </div>

        <div>
            contenedor de imagen
        </div>

        <div>
            info de la actividad
        </div>

        <div>
           <CalendarComponent />
           
        </div> 

        <div>
           <button>Reservar</button> 
           <button>volver</button>
        </div>
    <hr/>
        <div>Valoraciones de usuarios
            <div>reseña#1</div>
        </div>

    </div>
    )
}

export default Detail;