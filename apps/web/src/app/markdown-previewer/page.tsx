"use client"

import React from "react"
import { Textarea } from "@/components/ui/text-area"
import Container from "@/components/container"
import Title from "@/components/title"
import {
  parseItalic,
  parseBold,
  parseHeadings,
  parseStrikethrough,
  parseBlockquote,
  parseInlineCode,
  parseHorizontalRule,
  parseHighlight,
  parseLinks,
  parseImages,
  parseUnorderedList,
} from "@/lib/markdown-parser"

import "@/styles/preview.css"

function MarkdownPreviewer() {
  const [value, setValue] = React.useState("")
  const words = value.match(/\S+/g)?.length || 0
  const chars = value.length || 0
  const charsWithoutSpaces = value.replaceAll(" ", "").length || 0
  const paragraphs =
    value.split('\n').filter((paragraph) => paragraph !== '').length || 0

  const parseMarkdown = (markdownText: string) => {
    const unorderedListProcessedText = parseUnorderedList(markdownText);
    const lines = unorderedListProcessedText.split("\n");

    return lines.map((line, index) => {
      if (
        line.startsWith("<li>") ||
        line.startsWith("</ul>") ||
        line.startsWith("<ul>")
      ) {
        return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
      }

      const element =
        parseHorizontalRule(line) ||
        parseBlockquote(line) ||
        parseHeadings(line);

      if (element) {
        return React.cloneElement(element, { key: index });
      }

      let parsedLine = parseBold(line);
      parsedLine = parseItalic(parsedLine);
      parsedLine = parseStrikethrough(parsedLine);
      parsedLine = parseInlineCode(parsedLine);
      parsedLine = parseHighlight(parsedLine);
      parsedLine = parseImages(parsedLine);
      parsedLine = parseLinks(parsedLine);

      return <p key={index} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
    });
  };

  return (
    <Container className="flex flex-col items-center justify-center">
      <Title title="Markdown Previewer" />
      <div className="my-12 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{words}</div>
          <div className="text-xs font-bold text-muted-foreground">words</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{chars}</div>
          <div className="text-xs font-bold text-muted-foreground">characters</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{charsWithoutSpaces}</div>
          <div className="text-xs font-bold text-muted-foreground">characters without spaces</div>
        </div>
        <div className="h-24 w-full rounded-lg border p-3">
          <div className="text-2xl font-bold">{paragraphs}</div>
          <div className="text-xs font-bold text-muted-foreground">paragraphs</div>
        </div>
      </div>

      <div className="w-full space-y-4 md:flex md:space-x-4 md:space-y-0">
        <Textarea
          placeholder="Type here ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full md:w-1/2 shadow-md min-h-[300px] resize-y"
        />
        <div className="w-full md:w-1/2 shadow-md">
          <div
            className="preview rounded-md border p-4 min-h-[300px] whitespace-pre-wrap"
            style={{ height: '100%' }}
          >
            {parseMarkdown(value)}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MarkdownPreviewer
