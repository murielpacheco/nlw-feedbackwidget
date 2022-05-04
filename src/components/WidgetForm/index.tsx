import { useState } from "react";

import bugImg from "../../assets/bug.svg";
import ideaImg from "../../assets/idea.svg";
import thoughtImg from "../../assets/thought.svg";
import { FeedbackContentStep} from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const FeedbackTypes = {
   BUG: {
      title: "Problema",
      image: {
         src: bugImg,
         alt: "Imagem de um inseto"
      }
   },
   IDEA: {
      title: "Ideia",
      image: {
         src: ideaImg,
         alt: "Imagem de uma lâmpada"
      }
   },
   OTHER: {
      title: "Outro",
      image: {
         src: thoughtImg,
         alt: "Imagem de uma nuvem de pensamento"
      }
   },
}

export type FeedbackType = keyof typeof FeedbackTypes;

export function WidgetForm() {
   const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
   const [feedbackSent, setFeedbackSent] = useState(false)

   function handleRestartFeedback() {
      setFeedbackSent(false)
      setFeedbackType(null)
   }

   return (
      <div className="
      bg-zinc-900
      p-4 relative
      rounded-2xl
      mb-4 
      flex
      flex-col
      items-center
      shadow-lg
      w-[calc(100vw-2rem)]
      md:w-auto">
         {feedbackSent ? (
            <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
         ) : (
            <>
            {!feedbackType
               ?
                  <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType}/>
               :  
               <FeedbackContentStep
                  feedBackType={feedbackType}
                  onFeedbackRestartRequest={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
               />
         }
               </>   
         )}

         <footer className="text-xs text-neutral-400">
            Feito com ♥ pela <a className="underline underline-offset-1" href="https://rocketseat.com.br">Rocketseat</a>
         </footer>
      </div>
   );
}