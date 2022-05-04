import html2canvas from "html2canvas";
import { Camera } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

export function ScreenshotButton() {
   const [isTakingSreenshot, setIstTakinScreenshot] = useState(false)
   async function handleTakeScreenshot() {
      setIstTakinScreenshot(true);

      const canvas = await html2canvas(document.querySelector("html")!);
      const base64Image = canvas.toDataURL("image/png");

      setIstTakinScreenshot(false)
   }

   return (
      <button
      type="button"
      onClick={handleTakeScreenshot}   
      className="p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 transition:colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      >
         {isTakingSreenshot ? <Loading /> :  <Camera className="w-6 h-6 text-zinc-100" />}
      </button>
   )
}