package com.allphysics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

@RestController
@RequestMapping("/contact")
public class ContactResource {

    @PostMapping
    public ResponseEntity<String> handleContactForm(
            @RequestParam String asunto,
            @RequestParam("como-nos-conociste") String comoNosConociste,
            @RequestParam String correo,
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam("acepto-condiciones") String aceptaCondiciones) {

        // Validar si el usuario aceptó las condiciones
        if (aceptaCondiciones == null || !aceptaCondiciones.equals("on")) {
            return ResponseEntity.badRequest().body("<html><body><h2>Debes aceptar las condiciones</h2></body></html>");
        }

        // Configuración para JavaMail (modifica según tus credenciales)
        String host = "smtp.gmail.com";
        String from = "tu-email@gmail.com"; // Cambiar por tu correo
        String password = "tu-contraseña";  // Cambiar por tu contraseña

        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        try {
            // Crear el mensaje de correo
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(correo)); // Destinatario
            message.setSubject(asunto);

            // Contenido del correo
            String content = "Nombre: " + nombre + "\nApellido: " + apellido + "\nCorreo: " + correo
                    + "\nAsunto: " + asunto + "\nCómo nos conociste: " + comoNosConociste;

            message.setText(content);

            // Enviar el correo
            Transport.send(message);

            // Responder con un mensaje de éxito
            return ResponseEntity.ok("<html><body><h2>Formulario enviado con éxito</h2></body></html>");

        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("<html><body><h2>Ocurrió un error al enviar el correo</h2></body></html>");
        }
    }
}
