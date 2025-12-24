// package com.example.demo.controller;

// import com.example.demo.dto.LoginDTO;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @CrossOrigin(origins = "*")
// public class AuthController {

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginDTO dto) {

//         if ("admin".equals(dto.getUsuario()) &&
//             "123".equals(dto.getSenha())) {

//             return ResponseEntity.ok().build();
//         }

//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//     }
// }
package com.example.demo.controller;

import com.example.demo.dto.LoginDTO;
import com.example.demo.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Value("${ADMIN_USER}")
    private String adminUser;

    @Value("${ADMIN_PASS}")
    private String adminPass;

    @Autowired
    private JwtService jwtService;

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {

        if (adminUser.equals(dto.getUsuario()) &&
            adminPass.equals(dto.getSenha())) {

            String token = jwtService.gerarToken(dto.getUsuario());

            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // ===== ENDPOINT PROTEGIDO =====
    @GetMapping("/protegido")
    public ResponseEntity<?> protegido(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String usuario = jwtService.validarToken(token);

        return ResponseEntity.ok("Olá " + usuario);
    }
}
