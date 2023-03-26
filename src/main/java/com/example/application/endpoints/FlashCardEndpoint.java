package com.example.application.endpoints;

import java.util.List;

import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import com.example.application.FlashCard;
import com.example.application.FlashCardRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class FlashCardEndpoint {

  private final FlashCardRepository repository;

  public List<FlashCard> findAll() {
    return repository.findAll();
  }

  public FlashCard createCard(FlashCard flashCard) {
    return repository.save(flashCard);
  }
}
