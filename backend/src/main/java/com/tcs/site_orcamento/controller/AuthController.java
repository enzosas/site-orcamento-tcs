package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.LoginRequestDTO;
import com.tcs.site_orcamento.dto.LoginResponseDTO;
import com.tcs.site_orcamento.entity.Usuario;
import com.tcs.site_orcamento.repository.UsuarioRepository;
import com.tcs.site_orcamento.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){

        try{

            String token = authService.authenticateAndGetToken(
                    loginRequestDTO.getUsername(),
                    loginRequestDTO.getPassword()
            );
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token);
            return ResponseEntity.ok(loginResponseDTO);

        } catch (Exception e){

            return ResponseEntity.status(401).build();

        }
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario){
        try {
            Usuario novoUsuario = authService.registerUser(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<Usuario> delete(@PathVariable Integer id){
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public List<Usuario> listUsers(){
        return usuarioRepository.findAll();
    }
}
