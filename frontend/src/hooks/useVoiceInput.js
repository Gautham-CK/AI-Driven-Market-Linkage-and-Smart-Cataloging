import { useState, useEffect, useRef } from 'react';

const langMap = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  ta: 'ta-IN',
  bn: 'bn-IN'
};

export function useVoiceInput({ onResult, currentLang = 'en' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = langMap[currentLang] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
        if (onResult) {
          onResult(currentText);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLang, onResult]);

  const toggleListening = () => {
    if (!isSupported) {
      // Graceful fallback for mock/unsupported browsers
      if (!isListening) {
        setIsListening(true);
        const sampleVoices = {
          en: 'Handmade terracotta flower vase with traditional motifs',
          hi: 'पारंपरिक नक्काशीदार मिट्टी का फूलदान शुद्ध प्राकृतिक सामग्री से बना',
          kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆಯ ಮಣ್ಣಿನ ಹೂದಾನಿ',
          ta: 'பாரம்பரிய கைவினை மலர் குவளை',
          bn: 'ঐতিহ্যবাহী নকশার পোড়ামাটির ফুলদানি'
        };
        setTimeout(() => {
          const sample = sampleVoices[currentLang] || sampleVoices.en;
          setTranscript(sample);
          if (onResult) onResult(sample);
          setIsListening(false);
        }, 1800);
      } else {
        setIsListening(false);
      }
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  };

  return {
    isListening,
    transcript,
    isSupported,
    toggleListening,
    resetTranscript: () => setTranscript('')
  };
}
