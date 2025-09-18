package com.bankingSystem.prediction.Filter;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.Service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserRepository userRepository;

    public JWTFilter(JWTService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = null;

        // 1️⃣ Check Authorization header first
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")) {
            token = authorization.split(" ")[1];
        }

        // 2️⃣ If no header, check cookies
        if (token == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if (c.getName().equals("JWT_TOKEN")) {
                        token = c.getValue();
                        break;
                    }
                }
            }
        }

        // 3️⃣ If token still null, continue the filter chain
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 4️⃣ Extract username from token
        String username = jwtService.getUserName(token);
        if (username == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 5️⃣ Load user from database
        UserEntity userData = userRepository.findByUsername(username).orElse(null);
        if (userData == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 6️⃣ Set authentication in security context if not already set
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(userData.getUsername())
                    .password(userData.getPassword())
                    .build();

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }


        // 7️⃣ Continue filter chain
        filterChain.doFilter(request, response);
    }

}
