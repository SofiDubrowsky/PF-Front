import React, { useRef } from "react";
import Swal from 'sweetalert2';
import style from './AboutProgrammers.module.css';
import iconReact from '../../assets/react.png';
import iconVite from '../../assets/vite.png';
import iconRedux from '../../assets/redux.png';
import iconNode from '../../assets/nodejs.png';
import iconExpress from '../../assets/express.png';
import iconSequelize from '../../assets/sequelize.png';
import iconPostgreSQL from '../../assets/postgresql.png';
import iconNodemailer from '../../assets/nodemailer.png';
import iconSendGrid from '../../assets/sendgrid.png';
import iconCloudinary from '../../assets/cloudinary.png';
import iconAuth0 from '../../assets/auth0.png';
import iconMercadoPago from '../../assets/mercadopago.png';
import iconRender from '../../assets/render.png';
import iconTailwind from '../../assets/tailwindcss.png';
import iconSweetalert2 from '../../assets/sweetalert2.png';
import iconGit from '../../assets/git.png';
import iconTrello from '../../assets/trello.png';
import iconGitHub from '../../assets/github.png';
import iconLinkedin from '../../assets/linkedin2.png';
import iconGitHub2 from '../../assets/github2.png';
import iconGmail from '../../assets/gmail.png';
import iconReactChar from '../../assets/reactcharjs2.png'
import iconJest from '../../assets/jest.png'
import imgJuan from '../../assets/images/juan.jpg';
import imgSofia from '../../assets/images/sofi.jpg';
import imgFabrizio from '../../assets/images/fabri.jpg';
import imgAgustina from '../../assets/images/agustina.jpg';
import imgGonzalo from '../../assets/images/gonz.jpeg';
import imgNadia from '../../assets/images/nadia.jpg';
import imgLuciano from '../../assets/images/luciano.jpg';

const AboutProgrammers = () => {

    const emailJuan = "jmoracafe@gmail.com";
    const emailSofia = "sosodubrowsky@gmail.com";
    const emailFabrizio = "swfabri@gmail.com";
    const emailAgustina = "agustahhan@gmail.com";
    const emailGonzalo = "gonza.sch35@gmail.com";
    const emailNadia = "nadiagmartel@gmail.com";
    const emailLuciano = "luciano.vel166@gmail.com";
    const emailLeidy = "leidyjsz@gmail.com";

    const teamData = [
        {
            name: "Juan Pablo Mora",
            imgSrc: imgJuan,
            githubLink: "https://github.com/JuanPabloMora61",
            linkedinLink: "https://www.linkedin.com/in/juanpablomora61",
            email: emailJuan,
        },
        {
            name: "Sofía Dubrowsky",
            imgSrc: imgSofia,
            githubLink: "https://github.com/SofiDubrowsky",
            linkedinLink: "https://www.linkedin.com/in/disof%C3%ADadubrowsky",
            email: emailSofia,
        },
        {
            name: "Fabrizio Vettorelo",
            imgSrc: imgFabrizio,
            githubLink: "https://github.com/FabriVettorelo",
            linkedinLink: "https://www.linkedin.com/in/fabrizio-vettorelo-0629a3263/",
            email: emailFabrizio,
        },
        {
            name: "Agustina Tahhan",
            imgSrc: imgAgustina,
            githubLink: "https://github.com/agustinatahhan",
            linkedinLink: "https://www.linkedin.com/in/agustinatahhan/",
            email: emailAgustina,
        },
        {
            name: "Gonzalo Schmidt",
            imgSrc: imgGonzalo,
            githubLink: "https://github.com/Gonzasch35",
            linkedinLink: "https://www.linkedin.com/in/gonzalo-schmidt-240903250/",
            email: emailGonzalo,
        },
        {
            name: "Nadia Martel",
            imgSrc: imgNadia,
            githubLink: "https://github.com/nadiamartel",
            linkedinLink: "https://www.linkedin.com/in/nadia-martel-admin/",
            email: emailNadia,
        },
        {
            name: "Luciano Velasquez",
            imgSrc: imgLuciano,
            githubLink: "https://github.com/LucianoVelasquez",
            linkedinLink: "https://www.linkedin.com/in/luciano-velasquez-a73252269/",
            email: emailLuciano,
        },
        
         
    ];


    const teamRefs = useRef([]);

    const handleMouseMove = (index, event) => {
        const container = teamRefs.current[index];
        const containerRect = container.getBoundingClientRect();

        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        const moveX = (centerX - mouseX) / centerX * 20; // Aumentamos el factor de ajuste a 20
        const moveY = (centerY - mouseY) / centerY * 15;

        container.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = (index) => {
        const container = teamRefs.current[index];
        container.style.transform = "none";
    };


    function showAndCopyEmail(email) {
        Swal.fire({
            title: "Correo electrónico",
            text: email,
            icon: "info",
            background: "#000",
            confirmButtonColor: "#9AC71F",
            confirmButtonText: "Copiar al portapapeles",
            showClass: {
                popup: "swal2-noanimation",
                backdrop: "swal2-noanimation"
            },
            hideClass: {
                popup: "",
                backdrop: ""
            },
            backdrop: `
            rgba(250, 249, 249, 0.192)
            url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 40' height='40px' width='160px'><rect width='160' height='40' rx='20' ry='20' fill='%239AC71F'/></svg>")
            left top
            no-repeat
          `
        }).then((result) => {
            if (result.isConfirmed) {
                navigator.clipboard.writeText(email)
                    .then(() => {

                        Swal.fire({
                            title: "¡Copiado!",
                            text: "El correo electrónico ha sido copiado al portapapeles",
                            icon: "success",
                            background: "#000",
                            confirmButtonColor: "#9AC71F",
                            confirmButtonText: "Aceptar",
                            showClass: {
                                popup: "swal2-noanimation",
                                backdrop: "swal2-noanimation"
                            },
                            hideClass: {
                                popup: "",
                                backdrop: ""
                            },
                            backdrop: `
                            rgba(250, 249, 249, 0.192)
                            url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 40' height='40px' width='160px'><rect width='160' height='40' rx='20' ry='20' fill='%239AC71F'/></svg>")
                            left top
                            no-repeat
                          `
                        });
                    })
                    .catch((err) => {
                        console.error("Error al copiar el correo electrónico:", err);

                        Swal.fire({
                            title: "Error",
                            text: "Hubo un error al copiar el correo electrónico",
                            icon: "error",
                            background: "#000",
                            shadow: "rgba(255, 255, 255, 0.5)",
                            confirmButtonColor: "#9AC71F",
                            confirmButtonText: "Aceptar",
                            showClass: {
                                popup: "swal2-noanimation",
                                backdrop: "swal2-noanimation"
                            },
                            hideClass: {
                                popup: "",
                                backdrop: ""
                            }
                        });
                    });
            }
        });
    }

    return (
        <center>
            <div className={style.aboutContainer}>
                <article className={style.aboutArticle}>
                    <h1>Sobre nosotros</h1><br></br>
                    <h3>¡Les presentamos a nuestro maravilloso equipo de desarrollo web! </h3><br></br>
                    <h3>Somos un grupo de estudiantes muy apasionados de <b className={style.logoHenry}>HENRY</b> dispuestos a dominar el fascinante universo del desarrollo web. Hoy estamos emocionados al compartir con ustedes nuestro increíble viaje. A pesar de los desafíos, nunca nos rendimos y seguimos avanzando con determinación inquebrantable. Nos sentimos profundamente orgullosos de haber alcanzado las metas propuestas en este proyecto y el haber superado las expectativas iniciales.</h3><br></br>

                    <b>"Los más grandes logros se construyen con perseverancia, pasión y determinación, incluso cuando las circunstancias sean difíciles."</b>
                </article>

                <div className={style.aboutContainerDetail}>
                    {teamData.map((team, index) => (
                        <div
                            key={index}
                            className={style.aboutContainerDetailTeam}
                            onMouseMove={(event) => handleMouseMove(index, event)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            ref={(ref) => (teamRefs.current[index] = ref)}
                        >
                            <img className={style.aboutContainerDetailTeamImg} src={team.imgSrc} alt={team.name} />
                            <h1 className={style.aboutContainerDetailTeamTitle}>{team.name}</h1>
                            <section className={style.aboutContainerDetailTeamRedes}>
                                <a href={team.githubLink} target="_blank">
                                    <img className={style.aboutContainerDetailTeamIcons} src={iconGitHub2} alt="GitHub" />
                                </a>
                                <a href={team.linkedinLink} target="_blank">
                                    <img className={style.aboutContainerDetailTeamIcons} src={iconLinkedin} alt="LinkedIn" />
                                </a>
                                <a href={`mailto:${team.email}`} onClick={() => showAndCopyEmail(team.email)}>
                                    <img className={style.aboutContainerDetailTeamIcons} src={iconGmail} alt="Gmail" />
                                </a>
                            </section>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <div className={style.aboutArticleApp}>
                    <h1>Sobre la aplicación</h1><br></br>
                    <h3>Nuestra aplicación te ofrece una experiencia completa para explorar una amplia variedad de actividades en el complejo deportivo con sucursales múltiples. Con nuestra aplicación, podrás buscar y filtrar las actividades que más te interesen, así como ordenarlas según tus preferencias. Además, realizar reservas en nuestro complejo deportivo es fácil y conveniente. Puedes verificar la disponibilidad de fechas y horarios en tiempo real y realizar tu reserva en unos pocos clics.</h3>
                    <h3>Valoramos la opinión de nuestros usuarios, por lo que ahora nuestros compradores pueden dejar reseñas y puntuar las actividades. Esto proporciona información útil a otros clientes y ayuda a crear una comunidad en la que todos puedan compartir sus experiencias.</h3>
                    <h3>Como administrador, también tienes acceso a un área de control donde puedes crear nuevas actividades. Podrás agregar imágenes y descripciones detalladas para que los usuarios tengan una visión clara de lo que ofrece cada actividad. Además, podrás hacer un seguimiento de la cantidad de reservas por actividad, usuario y sucursal, lo que te ayudará a tomar decisiones informadas sobre la gestión del complejo deportivo.</h3>
                    <h3>En Sportiverse, nos preocupamos por la seguridad y la protección de datos. Por eso, hemos implementado medidas de autenticación y tecnología segura para garantizar una experiencia confiable.Sumérgete en nuestra emocionante aplicación y descubre un mundo de posibilidades para compartir las mejores experiencias deportivas con amigos y familiares en el complejo Sportiverse. Únete a nosotros ahora mismo y disfruta de la comodidad y la diversión que nuestra aplicación tiene para ofrecerte.</h3>
                </div>
            </div>

            <div className={style.aboutConteinerPrincipal}>
                <h1>Tecnologías implementadas</h1><br></br>

                <div className={style.aboutConteiner}>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconReact} alt="React" />
                            <h2 className={style.aboutSectionTitle}>React</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                React es una biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables. Permite crear componentes independientes y gestionar eficientemente el estado de la aplicación, lo que facilita el desarrollo de aplicaciones web rápidas y escalables. Su enfoque basado en componentes y virtual DOM mejora el rendimiento y la experiencia del usuario.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconVite} alt="Vite" />
                            <h2 className={style.aboutSectionTitle}>Vite</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Vite es un entorno de desarrollo rápido y liviano para aplicaciones web. Se enfoca en la velocidad de desarrollo al utilizar el módulo de JavaScript nativo para cargar y compilar archivos de manera eficiente. Vite es conocido por su capacidad para iniciar rápidamente el servidor de desarrollo y proporcionar una experiencia de desarrollo fluida, lo que mejora la productividad de los desarrolladores.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconRedux} alt="Redux" />
                            <h2 className={style.aboutSectionTitle}>Redux</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Redux es una biblioteca de JavaScript utilizada para administrar el estado de una aplicación. Se basa en el patrón de diseño Flux y proporciona un flujo de datos unidireccional y predecible. Redux facilita la gestión de estados complejos en aplicaciones web al centralizar el estado de la aplicación en un solo lugar y permitir cambios predecibles y controlados mediante acciones y reducers. Esto mejora la escalabilidad y mantenibilidad de las aplicaciones.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconNode} alt="NodeJS" />
                            <h2 className={style.aboutSectionTitle}>NodeJS</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                NodeJS es un entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones web y de red altamente escalables. Con su modelo de programación basado en eventos y su capacidad para manejar conexiones en tiempo real, Node.js es ideal para aplicaciones de alta concurrencia y tiempo real como chats, streaming y API.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconExpress} alt="ExpressJS" />
                            <h2 className={style.aboutSectionTitle}>ExpressJS</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Express es un es un marco de trabajo minimalista y flexible para construir aplicaciones web en Node.js. Proporciona una capa de abstracción sobre las funcionalidades básicas de Node.js, facilitando la creación de servidores y el manejo de rutas, peticiones HTTP, cookies y más. Con su enfoque ligero y su amplia comunidad de usuarios, Express.js es una opción popular para desarrollar aplicaciones web rápidas y escalables.
                            </p>
                        </div>
                    </section>


                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconSequelize} alt="Sequelize" />
                            <h2 className={style.aboutSectionTitle}>Sequelize</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Sequelize es un ORM (Object-Relational Mapping) para Node.js que simplifica la interacción con bases de datos relacionales. Proporciona una capa de abstracción que permite realizar consultas y manipulaciones de datos utilizando objetos y métodos en lugar de sentencias SQL directas. Es compatible con varios dialectos de bases de datos y facilita el desarrollo de aplicaciones escalables y mantenibles.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconPostgreSQL} alt="PostgreSQL" />
                            <h2 className={style.aboutSectionTitle}>PostgreSQL</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                PostgreSQL es un sistema de gestión de bases de datos relacionales (RDBMS) de código abierto. Es conocido por ser confiable, robusto y altamente escalable, y se utiliza ampliamente en aplicaciones de empresas y sitios web de gran envergadura.                                </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconNodemailer} alt="Nodemailer" />
                            <h2 className={style.aboutSectionTitle}>Nodemailer</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Nodemailer es una biblioteca de JavaScript utilizada para enviar correos electrónicos desde aplicaciones Node.js. Proporciona una interfaz sencilla para crear y enviar mensajes de correo electrónico, adjuntar archivos, gestionar destinatarios y trabajar con servidores de correo. Nodemailer facilita la integración de capacidades de correo electrónico en aplicaciones Node.js, lo que es útil para notificaciones por correo electrónico, confirmaciones de cuentas y más.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconSendGrid} alt="SendGrid" />
                            <h2 className={style.aboutSectionTitle}>SendGrid</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                SendGrid es un servicio en la nube que se utiliza para enviar correos electrónicos transaccionales y de marketing. Proporciona una plataforma confiable y escalable para enviar mensajes de correo electrónico de manera rápida y segura.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconCloudinary} alt="Cloudinary" />
                            <h2 className={style.aboutSectionTitle}>Cloudinary</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Cloudinary es un servicio en la nube que ofrece almacenamiento, optimización y manipulación de imágenes y videos. Proporciona una API sencilla para cargar y administrar medios en la nube, además de herramientas para realizar ajustes de tamaño, recortes, efectos y compresión de archivos multimedia. Cloudinary facilita la gestión y entrega eficiente de contenido multimedia en aplicaciones web.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconAuth0} alt="Auth0" />
                            <h2 className={style.aboutSectionTitle}>Auth0</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Auth0 es un servicio de autenticación y autorización que se utiliza para gestionar la autenticación de usuarios en aplicaciones web y móviles. Proporciona una solución completa y segura para la gestión de identidad y acceso, lo que permite a los desarrolladores implementar fácilmente funciones de inicio de sesión, registro de usuarios y autenticación en sus aplicaciones.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconMercadoPago} alt="MercadoPago" />
                            <h2 className={style.aboutSectionTitle}>MercadoPago</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                MercadoPago es una plataforma de pagos en línea que ofrece soluciones para realizar transacciones seguras en aplicaciones y sitios web. Permite aceptar pagos con tarjetas de crédito, débito y otros métodos, gestionar suscripciones, generar informes y ofrecer una experiencia de pago fácil y confiable a los usuarios.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconRender} alt="Render" />
                            <h2 className={style.aboutSectionTitle}>Render</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Render es una biblioteca de JavaScript que proporciona una solución de renderizado universal para aplicaciones web. Permite renderizar componentes tanto en el servidor como en el cliente, lo que mejora el rendimiento y la experiencia del usuario al cargar rápidamente el contenido inicial de la página. Render es compatible con diferentes frameworks y bibliotecas, lo que lo hace versátil y fácil de integrar en proyectos existentes.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconReactChar} alt="ReactChart.js2" />
                            <h2 className={style.aboutSectionTitle}>React Chart.js 2</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                React Chart.js 2 es una biblioteca de React que proporciona componentes para trabajar con gráficos usando Chart.js, una biblioteca de JavaScript para crear gráficos interactivos y visualizaciones de datos.Proporciona una amplia gama de tipos de gráficos, como barras, líneas, tortas y más. Con una sintaxis sencilla y flexible, se puede personalizar el diseño, los colores y las animaciones de los gráficos.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconTailwind} alt="TailwindCSS" />
                            <h2 className={style.aboutSectionTitle}>TailwindCSS</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Tailwind CSS ofrece una amplia gama de clases de utilidad que se pueden combinar para crear estilos personalizados de manera rápida y eficiente. Tailwind CSS permite un desarrollo ágil al proporcionar un enfoque centrado en componentes y una configuración flexible.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconSweetalert2} alt="Sweetalert2" />
                            <h2 className={style.aboutSectionTitle}>Sweetalert2</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Sweetalert2 es una biblioteca de JavaScript que proporciona una forma atractiva de mostrar mensajes emergentes y diálogos modales en aplicaciones web. Permite personalizar y diseñar ventanas emergentes con mensajes, iconos y botones interactivos. Sweetalert2 mejora la experiencia del usuario al proporcionar una forma elegante de mostrar alertas, confirmaciones y mensajes informativos en aplicaciones web.
                            </p>
                        </div>
                    </section>

                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconJest} alt="Jest" />
                            <h2 className={style.aboutSectionTitle}>Jest</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                            Jest es un marco de testing de JavaScript. Es una herramienta que permite realizar pruebas unitarias automáticas, proporciona cobertura de código, y nos permite simular fácilmente objetos.   Jest puede generar informes de cobertura de código, que muestran cuántas líneas de código han sido cubiertas por las pruebas unitarias.
                            </p>
                        </div>
                    </section>


                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconGit} alt="Git" />
                            <h2 className={style.aboutSectionTitle}>Git</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Git es un sistema de control de versiones distribuido utilizado para rastrear cambios en archivos y coordinar el trabajo en proyectos de desarrollo de software. Permite el trabajo en equipo, ramificación y fusi'n de código, y facilita la colaboración y el seguimiento de modificaciones en el tiempo de manera eficiente y segura.
                            </p>
                        </div>
                    </section>


                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconTrello} alt="Trello" />
                            <h2 className={style.aboutSectionTitle}>Trello</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                Trello es una herramienta de gestión de proyectos basada en tableros virtuales. Permite organizar tareas, asignarlas a miembros del equipo, establecer fechas límite y colaborar en tiempo real. Es intuitiva y facil de usar, ideal para el seguimiento de proyectos y la coordinación de equipos.
                            </p>
                        </div>
                    </section>


                    <section className={style.aboutSection}>
                        <div className={style.aboutConteiner}>
                            <img className={style.aboutSectionImg} src={iconGitHub} alt="GitHub" />
                            <h2 className={style.aboutSectionTitle}>GitHub</h2>
                        </div>
                        <div className={style.aboutConteinerParrafo}>
                            <p className={style.aboutParrafo}>
                                GitHub es una plataforma de alojamiento y colaboración de código fuente. Permite a los desarrolladores almacenar, gestionar y compartir repositorios de código, realizar seguimiento de problemas y realizar colaboraciones con otros desarrolladores. Es ampliamente utilizado en la comunidad de desarrollo de software para el control de versiones y el trabajo en equipo.
                            </p>
                        </div>
                    </section>

                </div>


            </div>
        </center>
    )
}

export default AboutProgrammers;