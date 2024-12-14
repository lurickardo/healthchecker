import React, { useState, useRef } from "react";

const HighlightEditableText = () => {
  const [text, setText] = useState("Olá, meu nome é {{name}}");
  const editableRef = useRef(null) as any;

  const handleInput = () => {
    const textContent = editableRef.current.innerText;
    setText(textContent);
  };

  const getHighlightedHTML = (input: any) => {
    return input.replace(
      /(\{\{.*?\}\})/g,
      '<span class="text-blue-500 font-bold">$1</span>'
    );
  };

  return (
    <div
      ref={editableRef}
      contentEditable
      suppressContentEditableWarning
      className="w-full max-w-lg p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300 text-black whitespace-pre-wrap break-words"
      onInput={handleInput}
      dangerouslySetInnerHTML={{
        __html: getHighlightedHTML(text),
      }}
    />
  );
};

export default HighlightEditableText;
// é so ter uma funcao acompanhando cada caractere sendo escrito e sendo invocada na hora
// essa funcao ira pegar o texto preenchido, fazer o replace e estilizar, depois colar novamente
// pode ser criado um componente somente para isso, entao troca os input por esse caso tenha estilizacao
