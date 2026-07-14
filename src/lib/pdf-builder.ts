import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface PdfSection {
  heading?: string;
  fields: { label: string; value: string }[];
}

export interface PdfOptions {
  title: string;
  subtitle?: string;
  state?: string;
  disclaimer?: string;
  sections: PdfSection[];
  fileName?: string;
}

export async function generatePdf(options: PdfOptions): Promise<void> {
  const {
    title,
    subtitle,
    state,
    disclaimer = 'This document is for informational purposes only and does not constitute legal advice. Consult with a licensed attorney for legal advice specific to your situation.',
    sections,
    fileName = 'legal-document.pdf',
  } = options;

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const margin = 60;
  const contentWidth = width - 2 * margin;
  let y = height - margin;

  const drawText = (text: string, x: number, yPos: number, font: typeof helvetica, size: number, color = rgb(0, 0, 0), maxWidth = contentWidth) => {
    // Manual text wrapping using widthOfTextAtSize
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    for (const line of lines) {
      if (yPos < margin + 40) return yPos;
      page.drawText(line, { x, y: yPos, size, font, color });
      yPos -= size + 4;
    }
    return yPos;
  };

  // Title
  y = drawText(title, margin, y, helveticaBold, 20, rgb(0.1, 0.2, 0.5));
  y -= 4;

  // Subtitle
  if (subtitle) {
    y = drawText(subtitle, margin, y, helvetica, 11, rgb(0.3, 0.3, 0.3));
    y -= 2;
  }

  // State
  if (state) {
    y = drawText(`State: ${state}`, margin, y, helvetica, 10, rgb(0.2, 0.2, 0.2));
    y -= 2;
  }

  // Date
  y = drawText(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y, helvetica, 10, rgb(0.2, 0.2, 0.2));
  y -= 8;

  // Divider line
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: rgb(0.6, 0.6, 0.6),
  });
  y -= 16;

  // Sections
  for (const section of sections) {
    if (y < margin + 80) {
      // Add new page if running out of space
      const newPage = pdfDoc.addPage();
      y = newPage.getSize().height - margin;
    }

    if (section.heading) {
      y = drawText(section.heading, margin, y, helveticaBold, 13, rgb(0.1, 0.2, 0.5));
      y -= 4;
    }

    for (const field of section.fields) {
      if (field.value) {
        const labelX = margin;
        const valueX = margin + 200;

        y = drawText(field.label + ':', labelX, y, helveticaBold, 10);
        y = drawText(field.value || '(not provided)', valueX, y + 14, helvetica, 10, rgb(0.1, 0.1, 0.1), contentWidth - 200);
        y -= 4;
      }
    }

    y -= 10;
  }

  // Disclaimer
  if (y < margin + 100) {
    const newPage = pdfDoc.addPage();
    y = newPage.getSize().height - margin;
  }

  y -= 8;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: rgb(0.6, 0.6, 0.6),
  });
  y -= 12;

  y = drawText('DISCLAIMER', margin, y, helveticaBold, 9, rgb(0.5, 0.1, 0.1));
  y = drawText(disclaimer, margin, y, helveticaOblique, 8, rgb(0.4, 0.4, 0.4));
  y -= 8;

  // Signature lines
  y -= 10;
  y = drawText('Signatures:', margin, y, helveticaBold, 11, rgb(0, 0, 0));
  y -= 20;

  // Left signature line
  page.drawLine({
    start: { x: margin, y },
    end: { x: margin + 200, y },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawText('Signature / Date', { x: margin, y: y - 14, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Right signature line
  page.drawLine({
    start: { x: margin + 250, y },
    end: { x: margin + 450, y },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  });
  page.drawText('Signature / Date', { x: margin + 250, y: y - 14, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}