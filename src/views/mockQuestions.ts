export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export const mockQuestions: Question[] = [
  {
    question: "Kuka on Ranskan uusi pääministeri?",
    options: [
      "Michel Barnier",
      "Henri Charrière ",
      "Edmond Dantès ",
      "Antoine Roquentin ",
    ],
    answer: "Michel Barnier",
  },
  {
    question:
      "Mikä on talletuksilla ja lainakannalla mitattuna Suomen suurin pankki?",
    options: ["Nordea", "Danske Bank", "OP", "Aktia"],
    answer: "OP",
  },
  {
    question:
      "Minkä ministeriön kansliapäälliköksi on nimitetty Antti Leinonen?",
    options: [
      "Ulkoministeriön",
      "Sisäministeriön",
      "Valtiovarainministeriön",
      "Oikeusministeriön",
    ],
    answer: "Oikeusministeriön",
  },
  {
    question: "Mikä therianiksi kutsuttu ihminen tuntee olevansa?",
    options: ["Jumala", "Enkeli", "Eläin", "Puu"],
    answer: "Eläin",
  },
  {
    question: "Kuka on Elinkeinoelämän valtuuskunnan toimitusjohtaja?",
    options: [
      "Aki Kangasharju",
      "Carl Haglund",
      "Harri Broman",
      "Emilia Kullas",
    ],
    answer: "Aki Kangasharju",
  },
  {
    question: "Kuka sävelsi lähes kaikki Ultra Bra -yhtyeen kappaleet?",
    options: [
      "Kerkko Koskinen",
      "Vuokko Hovatta",
      "Antti Lehtinen",
      "Joel Melasniemi",
    ],
    answer: "Kerkko Koskinen",
  },
  {
    question: "Mikä on ammoniumkloridin tunnetumpi nimi?",
    options: ["Ruokasuola", "Liivate", "Salmiakki", "Talkki"],
    answer: "Salmiakki",
  },
  {
    question:
      "Minkä maalainen kestävyysjuoksija oli polttamalla tapettu Rebecca Cheptegei?",
    options: ["Kenialainen", "Etiopialainen", "Ugandalainen", "Tansanialainen"],
    answer: "Ugandalainen",
  },
  {
    question:
      "Mikä oli vuonna 2017 ensimmäinen avaruuteen laukaistu suomalaissatelliitti?",
    options: ["Aalto-2", "Aalto-3", "Suomi-100", "Iceye"],
    answer: "Aalto-2",
  },
  {
    question:
      "Entä mikä sen jälkeen laukaistu suomalaissatelliitti paloi ilmakehässä syksyllä 2024?",
    options: ["Aalto-0.5", "Aalto-1", "Vaisala-1", "Vaisala-2"],
    answer: "Aalto-1",
  },
];
