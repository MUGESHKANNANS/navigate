import React from 'react';

const Message = ({ role, content }) => {
  const isUser = role === 'user';
  const isSystem = role === 'system';

  const messageAlignment = {
    user: 'justify-end',
    system: 'justify-center',
    assistant: 'justify-start',
  }[role];

  const bubbleStyle = {
    user: 'bg-primary/20 border border-primary/40 shadow-glow text-right',
    system: 'bg-chatBg border border-border/30 italic text-sm text-center',
    assistant: 'bg-accent/20 border border-accent/40 shadow-glow text-left',
  }[role];

  return (
    <div className={`flex ${messageAlignment} mb-3 px-2 sm:px-4`}>
      <div
        className={`
          px-4 py-2 sm:py-3 rounded-2xl 
          max-w-[95%] sm:max-w-[85%] 
          w-fit break-words text-sm sm:text-base 
          leading-relaxed transition-all 
          hover:shadow-glow-hover ${bubbleStyle}
        `}
      >
        {typeof content === 'string' ? content : content}
      </div>
    </div>
  );
};

export default Message;
