import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const response = await fetch('js/API_KEY.txt');
const API_KEY = await response.text();

const genAI = new GoogleGenerativeAI(API_KEY);


// HARM_CATEGORY_HARASSMENT, HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, and HARM_CATEGORY_DANGEROUS_CONTENT

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const text_container=document.getElementById("res");
  const loader = document.getElementById("loader")

const run1234 = async () =>{
  // For text-only input, use the gemini-pro model
  
    // Show loader
    text_container.style.opacity = 0;
    loader.style.display = "flex";
    // text_container.style.display="none";

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

    const prompt = fetch_input();

    const mod_prompt = "Write in one paragraph about: " + prompt;
    const result = await model.generateContent(mod_prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    // const text_container=document.getElementById("res");
    text_container.textContent = text;
    
    // LoadFade(text_container);
    // text_container.style.display="block";

    anime({
        targets: text_container,
        opacity: 1,
        duration: 500, // Duration of the animation in milliseconds
        easing: 'easeInOutQuad' // Easing function for smooth animation
      });


  } catch (error) {
    console.error("PLEASE USE YOUR OWN API KEY");
    console.error("Error:", error);
  } finally {
    // Hide loader
    document.getElementById("loader").style.display = "none";
  }
}

// const LoadFade = (div) =>{
//   div.style.transition= `opacity 0.2s ease`;
//   div.style.opacity = 0;
//   setTimeout(function() {
//       div.style.opacity = 1;
//     }, 200);
// }

const fetch_input = () =>{
    const prompt = document.getElementById("prompt").value;
    console.log(prompt);
    return prompt;
}

document.getElementById("send-prompt").addEventListener("click", run1234);

document.getElementById("prompt").addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    document.getElementById("send-prompt").click();
  }
});

