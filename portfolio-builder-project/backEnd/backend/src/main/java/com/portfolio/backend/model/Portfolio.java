package com.portfolio.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String bio;
    private String phone;
    private String email;
    private String linkedin;
    private String github;
    private String tenth;
    private String twelfth;
    private String graduation;
    private String postgraduation;
    private String skills;
    private String experience;

    @Lob // 👈 handles large image data
    private String image;

    private String username;

    public Portfolio() {}

    public Portfolio(String name, String bio, String phone, String email,
                     String linkedin, String github, String tenth, String twelfth,
                     String graduation, String postgraduation, String skills,
                     String experience, String image, String username) {
        this.name = name;
        this.bio = bio;
        this.phone = phone;
        this.email = email;
        this.linkedin = linkedin;
        this.github = github;
        this.tenth = tenth;
        this.twelfth = twelfth;
        this.graduation = graduation;
        this.postgraduation = postgraduation;
        this.skills = skills;
        this.experience = experience;
        this.image = image;
        this.username = username;
    }

    // ---------- Getters and Setters ----------
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getTenth() { return tenth; }
    public void setTenth(String tenth) { this.tenth = tenth; }

    public String getTwelfth() { return twelfth; }
    public void setTwelfth(String twelfth) { this.twelfth = twelfth; }

    public String getGraduation() { return graduation; }
    public void setGraduation(String graduation) { this.graduation = graduation; }

    public String getPostgraduation() { return postgraduation; }
    public void setPostgraduation(String postgraduation) { this.postgraduation = postgraduation; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
