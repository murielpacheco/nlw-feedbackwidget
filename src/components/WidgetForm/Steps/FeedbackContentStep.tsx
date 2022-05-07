import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../services/api";

import { FeedbackType, FeedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { Loading } from "../Loading";


interface FeedbackContentSetpProps {
   feedBackType: FeedbackType;
   onFeedbackRestartRequest: () => void;
   onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedBackType, onFeedbackRestartRequest, onFeedbackSent }: FeedbackContentSetpProps) {
   const [screenshot, setScreenshot] = useState<string | null>(null)
   const [comment, setComment] = useState("")
   const [isSendingFeedback, setisSendingFeedback] = useState(false)	
   
   const feedBackTypeInfo = FeedbackTypes[feedBackType]

   async function handleSubmitFeedback(event: FormEvent) {
      event.preventDefault()
      setisSendingFeedback(true);
      
      await api.post("/feedbacks", {
         type: feedBackType,
         comment,
         screenshot
      })

      onFeedbackSent();
      setisSendingFeedback(false)
   }
   return (
      <>
      <header>
            <button
               type="button"
               className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
               onClick={() => onFeedbackRestartRequest()}
            >
               <ArrowLeft weight="bold" className="w-4 h-4" />
            </button>
            
         <span className="text-xl leading-6 flex items-center gap-2">
            <img className="w-6 h-6" src={feedBackTypeInfo.image.src} alt={feedBackTypeInfo.image.alt} />
            {feedBackTypeInfo.title}
         </span>
         <CloseButton />
      </header>
         
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
         <textarea
            className="min-w-[304px] w-full min-h-[102px] text-sm placeholder:text-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
            placeholder="Conte com detalhes o que está acontecendo..."
            onChange={event => setComment(event.target.value)}
            />
            
         <footer className="flex gap-2 mt-2">
            <ScreenshotButton 
               screenshot={screenshot}
               onScreenshotTaken={setScreenshot}
            />         
            <button
               type="submit"
               disabled={comment.length === 0 || isSendingFeedback}
               className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
               {isSendingFeedback ? <Loading /> : "Enviar Feedback"}
            </button>
         </footer>
      </form>
      </>
   );
}