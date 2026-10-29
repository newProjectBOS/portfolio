import type { IconType } from "react-icons";
import {
  FiCode,
  FiLayout,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";

type OffertPoint = {
  icon: IconType;
  title: string;
  description: string;
};

const OFFERT_POINTS: OffertPoint[] = [
  {
    icon: FiLayout,
    title: "Strony www",
    description:
      "Tworzymy estetyczne, przejrzyste i intuicyjne strony firmowe, które przedstawiają ofertę w atrakcyjny sposób i ułatwiają klientom kontakt z Twoją firmą.",
  },
  {
    icon: FiShoppingBag,
    title: "Sklepy internetowe",
    description:
      "Budujemy sklepy oparte na sprawdzonych i bezpiecznych rozwiązaniach – szybkie, intuicyjne w obsłudze i z estetyczną prezentacją Twojej oferty.",
  },
  {
    icon: FiRefreshCw,
    title: "Refreshing stron",
    description:
      "Usprawniamy witryny wizualnie, funkcjonalnie, technicznie i marketingowo-prawnie, dopasowując je do Twoich aktualnych celów i oczekiwań użytkowników.",
  },
  {
    icon: FiCode,
    title: "Oprogramowanie dla biznesu",
    description:
      "Tworzymy aplikacje i systemy informatyczne, które usprawnią i zautomatyzują działanie Twojej firmy.",
  },
];

export default OFFERT_POINTS;