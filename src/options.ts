import { SourceLoc } from "./ast";

class Warning {
  message : string;
  offset ?: number;
  sourceLoc ?: SourceLoc;
  constructor(message : string, pos ?: number | SourceLoc) {
    this.message = message;
    if (typeof pos === "number") {
      this.offset = pos;
    } else if (pos && "line" in pos) {
      this.sourceLoc = pos;
      this.offset = pos.offset;
    }
  }
  render() : string {
    let result = this.message;
    if (this.sourceLoc) {
      result += ` at line ${this.sourceLoc.line}, col ${this.sourceLoc.col}`;
    } else if (this.offset) {
      result += ` at offset ${this.offset}`;
    }
    return result;
  }
}

interface Options {
  warn?: (warning : Warning) => void;
  // Allow block-level constructs (lists, block quotes, headings, etc.) to
  // interrupt a paragraph, so no blank line is required before them. This
  // trades away hard-wrap friendliness (design goal #7) but preserves the
  // other goals, including uniform composition (#8).
  blocksInterruptParagraphs?: boolean;
}

export type {
  SourceLoc,
  Options,
}
export {
  Warning,
}
