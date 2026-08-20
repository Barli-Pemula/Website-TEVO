"use client";

import React from "react";
import Image from "next/image";
import {
  ContentJson,
  ContentJsonNode,
  ContentJsonMark,
  formatMediaUrl,
} from "../../lib/article-utils";

function renderMarkedText(text: string, marks?: ContentJsonMark[]): React.ReactNode {
  if (!marks || marks.length === 0) return text;

  return marks.reduce<React.ReactNode>((acc, mark, idx) => {
    switch (mark.type) {
      case "bold":
        return <strong key={idx} className="font-bold text-ink">{acc}</strong>;
      case "italic":
        return <em key={idx} className="italic">{acc}</em>;
      case "underline":
        return <u key={idx} className="underline underline-offset-2">{acc}</u>;
      case "strike":
        return <s key={idx} className="line-through opacity-75">{acc}</s>;
      case "code":
        return (
          <code key={idx} className="bg-gold-warm/20 text-forest-dark px-1.5 py-0.5 rounded text-sm font-mono">
            {acc}
          </code>
        );
      case "link":
        return (
          <a
            key={idx}
            href={mark.attrs?.href || "#"}
            target={mark.attrs?.target || "_blank"}
            rel="noopener noreferrer"
            className="text-crimson font-medium underline underline-offset-2 hover:text-[#A90900] transition-colors"
          >
            {acc}
          </a>
        );
      default:
        return acc;
    }
  }, text);
}

function renderNode(node: ContentJsonNode, index: number): React.ReactNode {
  switch (node.type) {
    case "text":
      return (
        <React.Fragment key={index}>
          {renderMarkedText(node.text || "", node.marks)}
        </React.Fragment>
      );

    case "hardBreak":
      return <br key={index} />;

    case "paragraph": {
      if (!node.content || node.content.length === 0) {
        return <div key={index} className="h-3" />;
      }
      return (
        <p key={index} className="text-ink/80 text-base leading-relaxed mb-4">
          {node.content.map(renderNode)}
        </p>
      );
    }

    case "heading": {
      const level = node.attrs?.level || 2;
      const children = node.content ? node.content.map(renderNode) : null;
      switch (level) {
        case 1:
          return (
            <h1 key={index} className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-forest-dark mt-8 mb-4">
              {children}
            </h1>
          );
        case 2:
          return (
            <h2 key={index} className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-forest-dark mt-6 mb-3 border-b border-gold-warm/20 pb-2">
              {children}
            </h2>
          );
        case 3:
          return (
            <h3 key={index} className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-forest-dark mt-5 mb-2">
              {children}
            </h3>
          );
        default:
          return (
            <h4 key={index} className="font-semibold text-base text-forest-dark mt-4 mb-2">
              {children}
            </h4>
          );
      }
    }

    case "bulletList":
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-5 pl-2 text-ink/80 text-base leading-relaxed">
          {node.content?.map(renderNode)}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 mb-5 pl-2 text-ink/80 text-base leading-relaxed">
          {node.content?.map(renderNode)}
        </ol>
      );

    case "listItem":
      return (
        <li key={index} className="leading-relaxed">
          {node.content?.map(renderNode)}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-[#DCB06F] bg-[#FBF5EA] px-5 py-3 rounded-r-lg my-5 italic text-ink/85 shadow-sm"
        >
          {node.content?.map(renderNode)}
        </blockquote>
      );

    case "image": {
      const src = formatMediaUrl(node.attrs?.src);
      const alt = node.attrs?.alt || "Gambar artikel";
      if (!src) return null;

      return (
        <figure key={index} className="my-6 text-center">
          <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-md border border-gold-warm/20 bg-smoke aspect-video">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {node.attrs?.title && (
            <figcaption className="text-xs text-bark mt-2 italic">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      if (node.content && Array.isArray(node.content)) {
        return (
          <div key={index} className="my-2">
            {node.content.map(renderNode)}
          </div>
        );
      }
      return null;
  }
}

interface RichTextRendererProps {
  contentJson?: ContentJson | null;
  fallbackHtml?: string;
}

export default function RichTextRenderer({ contentJson, fallbackHtml }: RichTextRendererProps) {
  if (contentJson && contentJson.content && Array.isArray(contentJson.content) && contentJson.content.length > 0) {
    return (
      <div className="prose prose-stone max-w-none text-ink/80">
        {contentJson.content.map(renderNode)}
      </div>
    );
  }

  if (fallbackHtml) {
    // If it's plain text without tags, split by double newlines into paragraphs
    if (!fallbackHtml.includes("<") && !fallbackHtml.includes(">")) {
      const paragraphs = fallbackHtml.split(/\n\s*\n/);
      return (
        <div className="prose prose-stone max-w-none text-ink/80 space-y-4">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p.trim()}
            </p>
          ))}
        </div>
      );
    }

    return (
      <div
        className="prose prose-stone max-w-none text-ink/80"
        dangerouslySetInnerHTML={{ __html: fallbackHtml }}
      />
    );
  }

  return (
    <p className="text-bark text-sm italic">
      ⏳ Konten lengkap sedang dipersiapkan oleh tim konten.
    </p>
  );
}
