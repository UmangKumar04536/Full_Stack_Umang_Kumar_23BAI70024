package com.portfolio.backend.repository;

import com.portfolio.backend.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    // Fetch all portfolios belonging to a particular username
    List<Portfolio> findByUsername(String username);
}
