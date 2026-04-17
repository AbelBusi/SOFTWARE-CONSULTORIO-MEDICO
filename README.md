# Sistema de Gestión de Consultorio Médico

## Descripción
Aplicación web para la gestión de un consultorio médico. Permite administrar doctores, pacientes, horarios de atención y citas médicas, evitando conflictos mediante validaciones en el backend.

Combina una API REST con Spring Boot y una interfaz web usando Thymeleaf y Bootstrap.

---

## Vista general

![Sistema médico](https://saluddata.com/wp-content/uploads/2023/12/consultorio-medico.webp)

---

## Tecnologías utilizadas

| Tecnología        | Descripción                          | Icono |
|------------------|--------------------------------------|-------|
| Java 17          | Lenguaje principal del sistema       | ![Java](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg) |
| Spring Boot      | Framework backend                    | ![Spring](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg) |
| Spring Web       | Creación de APIs REST                | ![Spring](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg) |
| Spring Data JPA  | Persistencia de datos                | ![Spring](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg) |
| MySQL            | Base de datos relacional             | ![MySQL](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg) |
| Thymeleaf        | Motor de plantillas                  | ![HTML](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg) |
| Bootstrap        | Estilos frontend                     | ![Bootstrap](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg) |
| Lombok           | Reducción de código boilerplate      | ![Java](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg) |
| Validation       | Validación de datos                  | ![Java](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg) |
| Swagger          | Documentación de API                 | ![Swagger](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg) |

---

## Arquitectura

![Arquitectura](https://pbs.twimg.com/media/DYINcnqWsAA_g-D.jpg)

Patrón MVC:

- Model: Entidades del sistema  
- Repository: Acceso a datos  
- Service: Lógica de negocio  
- Controller: Endpoints  
- View: Thymeleaf + Bootstrap  

---

## Principios

- Clean Code  
- SOLID  
- Separación de responsabilidades  
- Bajo acoplamiento  

---

## Estructura de Paquetes (Backend)

```text
src/main/java/com/consultorio/
├── impl/         # Configuraciones de seguridad y Swagger
├── controllers/    # Controladores Web y REST
├── entities/       # Modelos de datos (JPA Entities)
├── repositories/   # Interfaces de acceso a datos
├── services/       # Interfaces y lógica de negocio
└── dto/            # Objetos de transferencia de datos
```
## Flujo del sistema

![Flujo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNMAUqSMF5QpQAfz20wq_PgsLB8yCMvWWVQ&s)

1. Doctor define horario  
2. Paciente solicita cita  
3. Sistema valida disponibilidad  
4. Se registra la cita  

---

## Requisitos

- Java 17  
- MySQL  
- Maven  
- IDE  

---

## Instalación

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

---

### 1. Obtener el proyecto

Puedes clonar el repositorio usando Git:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
## 2. Crear la base de datos

```bash
CREATE DATABASE consultorio;
```
## 3. Configurar variables de conexión

Ubica el archivo de configuración en la siguiente ruta:
src/main/resources/application.properties

Edita los valores según los parámetros de tu entorno local:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/consultorio
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

spring.thymeleaf.cache=false
```
