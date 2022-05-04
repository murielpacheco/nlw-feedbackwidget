import { ArrowLeft } from "phosphor-react";
import { FeedbackType, FeedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackContentSetpProps {
   feedBackType: FeedbackType;
   onFeedbackRestartRequest: () => void;
}

export function FeedbackContentStep({ feedBackType, onFeedbackRestartRequest }: FeedbackContentSetpProps) {
   const feedBackTypeInfo = FeedbackTypes[feedBackType]
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
         
      <form className="my-4 w-full">
            <textarea
               className="min-w-[304px] w-full min-h-[102px] text-sm placeholder:text-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
               placeholder="Conte com detalhes o que está acontecendo..."
         />
      </form>
      </>
   );
}