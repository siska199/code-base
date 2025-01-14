/* eslint-disable react/jsx-handler-names */
import { IconCheck, IconClipboard } from "@assets/icons";
import Container from "./Container";
import { useEffect, useState } from "react";
import Button from "@components/ui/Button";

type Props = {
  layout?: "hbc" | "hsc";
  text: string;
  classContainer?: string;
  classText?: string;
  classIcon?: string;
};

const CopyText = (props: Props) => {
  const { layout, text, classContainer, classText, classIcon } = props;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        //set alert in here to notify user if success to copy the text
        document.execCommand("copy");
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Container variant={layout || "hsc"} gap={"small"} className={`${classContainer}`}>
      <p className={`${classText}`}>{text}</p>
      <Button variant="plain" label={isCopied ? <IconCheck className="icon-primary" /> : <IconClipboard className="icon-primary w-[1rem]" />} className={`${classIcon}`} onClick={() => (isCopied ? null : handleCopyToClipboard())} />
    </Container>
  );
};

export default CopyText;
