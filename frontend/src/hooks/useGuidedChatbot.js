import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatbotNode, CHATBOT_ROOT_ID } from '../data/guidedChatbotFlow';

const SESSION_KEY = 'gag-guided-chatbot-session-v1';

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSession(payload) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota */
  }
}

/**
 * Option-driven guided chatbot state + actions.
 * @param {{ onWhatsApp?: () => void, typingDelayMs?: number }} opts
 */
export function useGuidedChatbot({ onWhatsApp, typingDelayMs = 450 } = {}) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [stack, setStack] = useState([]);
  const stackRef = useRef([]);
  const [currentNodeId, setCurrentNodeId] = useState(CHATBOT_ROOT_ID);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  const applyNode = useCallback((nodeId) => {
    const node = getChatbotNode(nodeId);
    setCurrentNodeId(node.id);
    setCurrentOptions(node.options || []);
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        id: `asst-${node.id}-${Date.now()}`,
        nodeId: node.id,
        text: node.message,
      },
    ]);
  }, []);

  const seedWelcome = useCallback(() => {
    const node = getChatbotNode(CHATBOT_ROOT_ID);
    setStack([]);
    setCurrentNodeId(CHATBOT_ROOT_ID);
    setCurrentOptions(node.options || []);
    setMessages([
      {
        role: 'assistant',
        id: `asst-${CHATBOT_ROOT_ID}-init`,
        nodeId: CHATBOT_ROOT_ID,
        text: node.message,
      },
    ]);
  }, []);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = loadSession();
    if (
      saved &&
      Array.isArray(saved.messages) &&
      saved.messages.length > 0 &&
      saved.currentNodeId &&
      Array.isArray(saved.currentOptions)
    ) {
      setMessages(saved.messages);
      setStack(saved.stack || []);
      setCurrentNodeId(saved.currentNodeId);
      setCurrentOptions(saved.currentOptions);
    } else {
      const node = getChatbotNode(CHATBOT_ROOT_ID);
      setStack([]);
      setCurrentNodeId(CHATBOT_ROOT_ID);
      setCurrentOptions(node.options || []);
      setMessages([
        {
          role: 'assistant',
          id: `asst-${CHATBOT_ROOT_ID}-init`,
          nodeId: CHATBOT_ROOT_ID,
          text: node.message,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveSession({
      messages,
      stack,
      currentNodeId,
      currentOptions,
    });
  }, [messages, stack, currentNodeId, currentOptions]);

  const runSideEffects = useCallback(
    (option) => {
      if (option.href) {
        navigate(option.href);
        if (option.scrollHomeForm) {
          window.setTimeout(() => {
            document.getElementById('book-consultation')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 420);
        }
      }
      if (option.tel) {
        window.location.href = `tel:${String(option.tel).replace(/\s/g, '')}`;
      }
      if (option.whatsapp && typeof onWhatsApp === 'function') {
        onWhatsApp();
      }
    },
    [navigate, onWhatsApp]
  );

  const selectOption = useCallback(
    (option) => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          id: `user-${Date.now()}`,
          text: option.label,
          optionId: option.id,
        },
      ]);

      if (option.restart) {
        setIsTyping(true);
        window.setTimeout(() => {
          setIsTyping(false);
          setStack([]);
          const nextId = option.next || CHATBOT_ROOT_ID;
          const node = getChatbotNode(nextId);
          setCurrentNodeId(node.id);
          setCurrentOptions(node.options || []);
          setMessages([
            {
              role: 'assistant',
              id: `asst-${node.id}-restart-${Date.now()}`,
              nodeId: node.id,
              text: node.message,
            },
          ]);
        }, typingDelayMs);
        return;
      }

      setIsTyping(true);
      window.setTimeout(() => {
        setIsTyping(false);

        if (option.next) {
          setStack((s) => [...s, currentNodeId]);
        }

        runSideEffects(option);

        if (option.next) {
          applyNode(option.next);
        }
      }, typingDelayMs);
    },
    [applyNode, currentNodeId, runSideEffects, typingDelayMs]
  );

  const goBack = useCallback(() => {
    const s = stackRef.current;
    if (s.length === 0) return;
    const copy = [...s];
    const restoreId = copy.pop();
    setMessages((prev) => [
      ...prev,
      { role: 'user', id: `user-back-${Date.now()}`, text: 'Go back', isBack: true },
    ]);
    setIsTyping(true);
    window.setTimeout(() => {
      const node = getChatbotNode(restoreId);
      setCurrentNodeId(node.id);
      setCurrentOptions(node.options || []);
      setStack(copy);
      setIsTyping(false);
    }, typingDelayMs * 0.7);
  }, [typingDelayMs]);

  const startOver = useCallback(() => {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      seedWelcome();
    }, typingDelayMs * 0.6);
  }, [seedWelcome, typingDelayMs]);

  return {
    messages,
    currentOptions,
    currentNodeId,
    stack,
    isTyping,
    selectOption,
    goBack,
    startOver,
    seedWelcome,
  };
}
