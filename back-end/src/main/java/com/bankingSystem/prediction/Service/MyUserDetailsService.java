package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userData = userRepository.findByUsername(username).orElse(null);

        if(userData == null) throw new UsernameNotFoundException("User not Found");

        UserDetails user = User.builder()
                .username(userData.getUsername())
                .password(userData.getPassword())
                .build();
        return user;
    }
}
