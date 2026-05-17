//Common functions that all html share

// Creates the Google Translate widget and adds English/Spanish translation options
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,es",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element" //div name to add this 
  );
}

//Starts the animations for AOS
AOS.init();