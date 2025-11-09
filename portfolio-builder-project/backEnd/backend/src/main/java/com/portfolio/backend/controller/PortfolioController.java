package com.portfolio.backend.controller;

import com.portfolio.backend.model.Portfolio;
import com.portfolio.backend.repository.PortfolioRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    // ✅ Get all portfolios for a specific user
    @GetMapping("/{username}")
    public List<Portfolio> getUserPortfolios(@PathVariable String username) {
        return portfolioRepository.findByUsername(username);
    }

    // ✅ Save a new portfolio
    @PostMapping
    public Portfolio savePortfolio(@RequestBody Portfolio portfolio) {
        System.out.println("Saving portfolio for user: " + portfolio.getUsername());
        return portfolioRepository.save(portfolio);
    }

    // ✅ Delete portfolio by ID
    @DeleteMapping("/{id}")
    public void deletePortfolio(@PathVariable Long id) {
        if (!portfolioRepository.existsById(id)) {
            throw new RuntimeException("Portfolio not found with ID: " + id);
        }
        portfolioRepository.deleteById(id);
    }

    // ✅ Update portfolio by ID
    @PutMapping("/{id}")
    public Portfolio updatePortfolio(@PathVariable Long id, @RequestBody Portfolio updatedPortfolio) {
        return portfolioRepository.findById(id)
            .map(portfolio -> {
                portfolio.setName(updatedPortfolio.getName());
                portfolio.setBio(updatedPortfolio.getBio());
                portfolio.setPhone(updatedPortfolio.getPhone());
                portfolio.setEmail(updatedPortfolio.getEmail());
                portfolio.setLinkedin(updatedPortfolio.getLinkedin());
                portfolio.setGithub(updatedPortfolio.getGithub());
                portfolio.setTenth(updatedPortfolio.getTenth());
                portfolio.setTwelfth(updatedPortfolio.getTwelfth());
                portfolio.setGraduation(updatedPortfolio.getGraduation());
                portfolio.setPostgraduation(updatedPortfolio.getPostgraduation());
                portfolio.setSkills(updatedPortfolio.getSkills());
                portfolio.setExperience(updatedPortfolio.getExperience());
                portfolio.setImage(updatedPortfolio.getImage());
                portfolio.setUsername(updatedPortfolio.getUsername());
                return portfolioRepository.save(portfolio);
            })
            .orElseThrow(() -> new RuntimeException("Portfolio not found with ID: " + id));
    }
}
