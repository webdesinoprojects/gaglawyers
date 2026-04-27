import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({
  id, label, value, onChange, placeholder = 'Write content...',
  required = false, minHeightClass = 'min-h-[260px]', maxLength, helpText,
}) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const syncingRef = useRef(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const text = (value || '').replace(/<[^>]*>/g, '').trim();
    setCharCount(text.length);
  }, [value]);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return undefined;
    const host = containerRef.current;
    const hostParent = host.parentElement;
    host.innerHTML = '';
    host.className = '';

    if (hostParent) {
      hostParent.querySelectorAll(':scope > .ql-toolbar').forEach((node) => node.remove());
    }

    quillRef.current = new Quill(host, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          [{ align: [] }],
          ['clean'],
        ],
      },
      formats: [
        'header', 'bold', 'italic', 'underline',
        'list', 'bullet', 'link', 'blockquote',
        'code-block', 'align',
      ],
    });

    if (value) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }

    const handleTextChange = () => {
      if (!quillRef.current) return;
      if (syncingRef.current) return;

      if (typeof maxLength === 'number') {
        const plainLength = quillRef.current.getText().trim().length;
        if (plainLength > maxLength) {
          const currentLength = quillRef.current.getLength() - 1;
          quillRef.current.deleteText(maxLength, Math.max(0, currentLength - maxLength), 'silent');
        }
      }

      const html = quillRef.current.root.innerHTML;
      const normalized = html === '<p><br></p>' ? '' : html;
      onChange(normalized);
    };

    quillRef.current.on('text-change', handleTextChange);

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change', handleTextChange);
        quillRef.current = null;
      }
      if (hostParent) {
        hostParent.querySelectorAll(':scope > .ql-toolbar').forEach((node) => node.remove());
      }
      host.className = '';
      host.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current) return;
    const editorHtml = quillRef.current.root.innerHTML;
    const normalizedEditorHtml = editorHtml === '<p><br></p>' ? '' : editorHtml;
    const normalizedValue = value || '';
    if (normalizedEditorHtml === normalizedValue) return;

    syncingRef.current = true;
    quillRef.current.clipboard.dangerouslyPasteHTML(normalizedValue);
    syncingRef.current = false;
  }, [value]);

  const minHeightPx = (() => {
    const m = String(minHeightClass || '').match(/min-h-\[(\d+)px\]/);
    return m ? `${m[1]}px` : '260px';
  })();

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {required ? '*' : ''}
          </label>
          <div className="text-xs text-gray-500">
            {typeof maxLength === 'number' ? `${charCount}/${maxLength}` : `${charCount} chars`}
          </div>
        </div>
      )}
      <div className="border border-gray-300 rounded-sm overflow-hidden bg-white">
        <div id={id} ref={containerRef} style={{ minHeight: minHeightPx }} />
      </div>
      <textarea
        tabIndex={-1}
        aria-hidden="true"
        value={(value || '').replace(/<[^>]*>/g, '').trim()}
        onChange={() => {}}
        required={required}
        className="sr-only"
      />
      {helpText && <p className="mt-2 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};

export default RichTextEditor;
