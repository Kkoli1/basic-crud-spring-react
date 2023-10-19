package com.akiopogi.fullstackbackend.repository;

import com.akiopogi.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
