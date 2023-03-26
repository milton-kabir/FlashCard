import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {CSSProperties, useEffect, useState} from "react";
import {FlashCardEndpoint} from "Frontend/generated/endpoints";
import {FlashcardArray} from "react-quizlet-flashcard";
import './FlashCardView.css';


interface FlashCard {
  id: number;
  frontHTML?: string | JSX.Element;
  backHTML?: string | JSX.Element;
  frontCardStyle?: CSSProperties;
  frontContentStyle?: CSSProperties;
  backCardStyle?: CSSProperties;
  backContentStyle?: CSSProperties;
  style?: CSSProperties;
}

export function FlashCardView() {

  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [frontHTML, setFrontHTML] = useState('');
  const [backHTML, setBackHTML] = useState('');


  useEffect(() => {
    async function fetchData() {
      const cards = await FlashCardEndpoint.findAll();
      setFlashCards(cards);
    }

    fetchData();
  }, []);

  async function addFlashCard() {
    if (frontHTML.trim().length < 1) {
      alert('Please Enter Front Data...');
      return;
    }

    const card: FlashCard = {
      id: 0,
      frontHTML,
      backHTML,
    };

    try {
      await FlashCardEndpoint.createCard(card);
      alert('Card submitted successfully!');
      setFrontHTML('');
      setBackHTML('');
    } catch (error) {
      alert('Card submission failed. Try again!');
    }
  }

  const htmlFlashCards: FlashCard[] = flashCards.map(card => {
    return {
      id: card.id,
      frontHTML: card.frontHTML,
      backHTML: card.backHTML,
      frontContentStyle: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
      backContentStyle: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
    }
  });

  return (
      <div className="flashcard-view-container">
        <h1>Flash Card</h1>

        <div className="form-container">
          <div className="form-group">
            <TextField id="fData" placeholder="Flash Card Front Data" value={frontHTML}
                       onChange={(e) => setFrontHTML(e.target.value)}/>
          </div>
          <div className="form-group">
            <TextField id="bData" placeholder="Flash Card Back Data" value={backHTML}
                       onChange={(e) => setBackHTML(e.target.value)}/>
          </div>
          <div className="form-group">
            <Button id="formBtn" onClick={addFlashCard}>Add</Button>
          </div>
        </div>

        <FlashcardArray cards={htmlFlashCards.map(card => ({
          ...card,
          front: card.frontHTML,
          back: card.backHTML,
        }))}/>
      </div>
  )
}