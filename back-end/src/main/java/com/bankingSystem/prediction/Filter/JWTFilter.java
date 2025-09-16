package com.bankingSystem.prediction.Filter;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.Service.JWTService;
import com.bankingSystem.prediction.Service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private  final UserRepository userRepository;

    public JWTFilter(JWTService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse  response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if(authorization==null) {
            filterChain.doFilter(request,response);
            return;
        }

        //if(!authorization.startsWith("Bearer "))  filterChain.doFilter(request,response);

        // mehema dann puluwan errors check krann. return eken phala ewa wada karan na
        if(!authorization.startsWith("Bearer "))  {
            filterChain.doFilter(request,response);
            return ;
        };


        String iwt_token = authorization.split(" ")[1];
        // get the user name through the token
        String username = jwtService.getUserName(iwt_token);

        if (username == null) {
            filterChain.doFilter(request,response);
            return;
        }

        UserEntity userData= userRepository.findByUsername(username).orElse(null);

        if(userData == null) {
            filterChain.doFilter(request,response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication()!= null) {
            filterChain.doFilter(request,response);
            return;
        }

        UserDetails userDetails = User.builder()
                .username(userData.getUsername())
                .password(userData.getPassword())
                .build();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());

        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(token);

        System.out.println(iwt_token);
        filterChain.doFilter(request,response); // filter eken issarhat arn yann kiyanne

    }
}
