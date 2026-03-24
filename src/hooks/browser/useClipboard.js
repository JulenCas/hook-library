import { useCallback, useState } from 'react';

export function useClipboard({ resetAfter = 2000 } = {}) {
  const [copiedText, setCopiedText] = useState('');
  const [status, setStatus] = useState('idle');

  const copy = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        setStatus('error');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setStatus('copied');

        if (resetAfter > 0) {
          window.setTimeout(() => setStatus('idle'), resetAfter);
        }

        return true;
      } catch {
        setStatus('error');
        return false;
      }
    },
    [resetAfter]
  );

  return { copy, copiedText, status };
}
