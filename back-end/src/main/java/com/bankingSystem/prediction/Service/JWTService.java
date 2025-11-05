package com.bankingSystem.prediction.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JWTService {

    private final SecretKey secretKey;

    // Generate Secrete Key for use jwt
    public JWTService() {
        try {
            SecretKey k = KeyGenerator.getInstance("HmacSHA256").generateKey();
            this.secretKey = Keys.hmacShaKeyFor(k.getEncoded());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // create JWT
    public String getJWTToken(String username) {
        return Jwts.builder()
                //.claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(secretKey)
                .compact();
    }

    // extract username
    public String getUserName(String token) {
        return getTokenData(token).getSubject();
    }

    // Validate token: checks if username matches and token is not expired
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUserName(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return getTokenData(token).getExpiration().before(new Date());
    }


    public Claims getTokenData(String token){
        try{
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
