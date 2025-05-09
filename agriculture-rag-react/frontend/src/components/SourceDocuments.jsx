import React from 'react';

const SourceDocuments = ({ sources, isVisible, toggleVisibility }) => {
  return (
    <div className="mt-6 pt-5 border-t border-border">
      <button 
        onClick={toggleVisibility} 
        className="text-primary text-sm hover:text-primary/80 hover:underline transition-colors mb-3"
      >
        {isVisible ? 'Hide Sources' : 'Show Sources'}
      </button>
      
      {isVisible && (
        <div className="max-h-[300px] overflow-y-auto p-4 bg-chatBg rounded-xl glow-border">
          <h3 className="text-lg font-semibold mb-4 glow-text">Source Documents</h3>
          {sources.map((source, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-border last:border-0 last:mb-0 last:pb-0 transition-all hover:bg-background/50 hover:shadow-glow rounded-lg p-3 -mx-3">
              <div className="flex justify-between text-sm text-text/60 mb-2">
                <span>{source.type}</span>
                <span>Page {source.page_num}</span>
              </div>
              <div className="text-sm leading-relaxed">{source.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourceDocuments;