import axios from 'axios';
import Swal from "sweetalert2";

export const GET_ACT_BY_NAME = "GET_ACT_BY_NAME";

export default function getActByName(name) {
    return async function (dispatch) {
        try {
            let result = await axios.get(
                 `http://localhost:3001/activities?name=${name}`
                // `https://sportiverse-server.onrender.com/activities?name=${name}`
            );

            if (result.data.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Búsqueda sin resultados',
                    text: 'No se encontraron resultados para la actividad consultada ',
                    showConfirmButton: false, // Oculta el botón de confirmación
                    timer: 3000, 
                    // customClass: {
                    //     container: 'custom-container'
                    //   },
                    background: '#FFFFFF',
                    timerProgressBar: true,
                    backdrop: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                    
                    
                });
    
            } else {
                return dispatch({
                    type: GET_ACT_BY_NAME,
                    payload: result.data,
                });
            }

        } catch (error) {
            console.log("Error in Action GET_ACT_BY_NAME: ", error);
        }
    };
}
