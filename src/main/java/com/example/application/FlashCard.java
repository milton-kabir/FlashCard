package com.example.application;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FlashCard {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String frontHTML;

  private String backHTML;

  public FlashCard(String frontHTML, String backHTML) {
    this.frontHTML = frontHTML;
    this.backHTML = backHTML;
  }
}
