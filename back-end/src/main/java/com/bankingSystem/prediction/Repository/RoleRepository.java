package com.bankingSystem.prediction.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bankingSystem.prediction.Entity.Role;
import java.util.Optional;

public interface RoleRepository extends JpaRepository< Role, Long> {
    Optional<Role> findByRoleName(String roleName);
}
