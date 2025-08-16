import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Quiz, QuizResult } from '@/data/quizzes';

// Extend jsPDF with autoTable properties
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

interface PDFOptions {
  title?: string;
  includeAnswers?: boolean;
  includeRecommendations?: boolean;
}

export class QuizResultPDFGenerator {
  private doc: jsPDFWithAutoTable;
  private currentY: number = 20;
  private margin: number = 20;
  private pageWidth: number = 210;
  private contentWidth: number = 170;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
    this.setupFonts();
  }

  private setupFonts() {
    // Set default font
    this.doc.setFont('helvetica');
    this.doc.setFontSize(12);
  }

  private addTitle(text: string, fontSize: number = 18) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += fontSize + 5;
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
  }

  private addSubtitle(text: string, fontSize: number = 14) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += fontSize + 3;
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
  }

  private addText(text: string, x: number = this.margin, fontSize: number = 12) {
    this.doc.setFontSize(fontSize);
    
    // Handle text wrapping
    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    
    if (this.currentY + (lines.length * fontSize * 0.4) > 280) {
      this.doc.addPage();
      this.currentY = 20;
    }
    
    this.doc.text(lines, x, this.currentY);
    this.currentY += lines.length * fontSize * 0.4 + 2;
  }

  private addSeparator() {
    this.currentY += 5;
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 10;
  }

  private addScoreCard(quiz: Quiz, result: QuizResult) {
    // Score overview in a styled box
    const scoreData = [
      ['Score', `${result.percentage}%`],
      ['Points', `${result.score}/${result.maxScore}`],
      ['Level', result.level.charAt(0).toUpperCase() + result.level.slice(1)],
      ['Time Spent', `${result.timeSpent} minutes`],
      ['Completed', new Date(result.completedAt).toLocaleDateString()],
    ];

    autoTable(this.doc, {
      startY: this.currentY,
      head: [['Quiz Result Summary']],
      body: scoreData,
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
        fontSize: 14,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 12,
      },
      styles: {
        cellPadding: 8,
        lineWidth: 0.1,
      },
      margin: { left: this.margin },
    });

    this.currentY = this.doc.lastAutoTable.finalY + 15;
  }

  private addQuizInfo(quiz: Quiz) {
    this.addSubtitle('Quiz Information');
    
    const quizInfo = [
      ['Title', quiz.title],
      ['Category', quiz.category],
      ['Difficulty', quiz.difficulty],
      ['Estimated Time', quiz.estimatedTime],
      ['Description', quiz.description],
    ];

    autoTable(this.doc, {
      startY: this.currentY,
      body: quizInfo,
      theme: 'plain',
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 120 },
      },
      margin: { left: this.margin },
    });

    this.currentY = this.doc.lastAutoTable.finalY + 15;
  }

  private addQuestionAnswers(quiz: Quiz, result: QuizResult) {
    this.addSubtitle('Question Responses');
    
    quiz.questions.forEach((question, index) => {
      // Check if we need a new page
      if (this.currentY > 250) {
        this.doc.addPage();
        this.currentY = 20;
      }

      // Question header
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`Question ${index + 1}:`, this.margin, this.currentY);
      this.currentY += 6;
      
      // Question text
      this.doc.setFont('helvetica', 'normal');
      const questionLines = this.doc.splitTextToSize(question.text, this.contentWidth);
      this.doc.text(questionLines, this.margin + 5, this.currentY);
      this.currentY += questionLines.length * 5 + 5;

      // Options
      question.options.forEach((option, optIndex) => {
        const letter = String.fromCharCode(65 + optIndex);
        const isSelected = this.isOptionSelected(question.id, option.id, result.answers);
        
        // Highlight selected option
        if (isSelected) {
          this.doc.setFillColor(59, 130, 246, 0.1); // Light blue background
          this.doc.rect(this.margin + 5, this.currentY - 2, this.contentWidth - 5, 8, 'F');
        }
        
        this.doc.text(`${letter}) ${option.text}`, this.margin + 10, this.currentY);
        this.currentY += 5;
      });

      this.currentY += 8;
    });
  }

  private isOptionSelected(questionId: string, optionId: string, answers: Record<string, string> | Array<{ questionId: string; optionId: string }>): boolean {
    if (Array.isArray(answers)) {
      return answers.some((answer: { questionId: string; optionId: string }) => answer.questionId === questionId && answer.optionId === optionId);
    } else if (typeof answers === 'object' && answers !== null) {
      return (answers as Record<string, string>)[questionId] === optionId;
    }
    return false;
  }

  private addFeedback(result: QuizResult) {
    this.addSubtitle('Feedback & Analysis');
    
    if (result.feedback) {
      this.addText(`Feedback: ${result.feedback}`);
    }

    if (result.recommendations && result.recommendations.length > 0) {
      this.addText('Recommendations:');
      result.recommendations.forEach((rec) => {
        this.addText(`• ${rec}`, this.margin + 10);
      });
    }

    if (result.areasOfImprovement && result.areasOfImprovement.length > 0) {
      this.addText('Areas for Improvement:');
      result.areasOfImprovement.forEach((area) => {
        this.addText(`• ${area}`, this.margin + 10);
      });
    }

    if (result.supportNeeded && result.supportNeeded.length > 0) {
      this.addText('Support Needed:');
      result.supportNeeded.forEach((support) => {
        this.addText(`• ${support}`, this.margin + 10);
      });
    }
  }

  private addRecommendedResources(result: QuizResult) {
    if (!result.proposedCourses?.length && !result.proposedProducts?.length && !result.proposedStreaks?.length) {
      return;
    }

    this.addSubtitle('Recommended Resources');

    if (result.proposedCourses && result.proposedCourses.length > 0) {
      this.addText('Courses:');
      result.proposedCourses.forEach((course) => {
        this.addText(`• ${course.name}`, this.margin + 10);
      });
      this.currentY += 5;
    }

    if (result.proposedProducts && result.proposedProducts.length > 0) {
      this.addText('Products:');
      result.proposedProducts.forEach((product) => {
        this.addText(`• ${product.name}`, this.margin + 10);
      });
      this.currentY += 5;
    }

    if (result.proposedStreaks && result.proposedStreaks.length > 0) {
      this.addText('Streaks:');
      result.proposedStreaks.forEach((streak) => {
        this.addText(`• ${streak.name}`, this.margin + 10);
      });
      this.currentY += 5;
    }
  }

  private addFooter() {
    const pageCount = this.doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      // Add page number
      this.doc.setFontSize(10);
      this.doc.setTextColor(128);
      this.doc.text(
        `Page ${i} of ${pageCount}`,
        this.pageWidth / 2,
        290,
        { align: 'center' }
      );
      
      // Add timestamp
      this.doc.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        this.pageWidth / 2,
        295,
        { align: 'center' }
      );
      
      // Add company branding
      this.doc.text(
        'Tiny Steps A Day',
        this.pageWidth / 2,
        300,
        { align: 'center' }
      );
    }
  }

  public generatePDF(quiz: Quiz, result: QuizResult, options: PDFOptions = {}) {
    const { title = 'Quiz Results Report', includeAnswers = true, includeRecommendations = true } = options;

    // Reset position
    this.currentY = 20;

    // Add title
    this.addTitle(title);
    this.addSeparator();

    // Add score card
    this.addScoreCard(quiz, result);
    this.addSeparator();

    // Add quiz information
    this.addQuizInfo(quiz);
    this.addSeparator();

    // Add question responses if requested
    if (includeAnswers) {
      this.addQuestionAnswers(quiz, result);
      this.addSeparator();
    }

    // Add feedback and recommendations if requested
    if (includeRecommendations) {
      this.addFeedback(result);
      this.addSeparator();
      
      this.addRecommendedResources(result);
      this.addSeparator();
    }

    // Add footer
    this.addFooter();

    return this.doc;
  }

  public download(quiz: Quiz, result: QuizResult, filename?: string) {
    const doc = this.generatePDF(quiz, result);
    const defaultFilename = `quiz-results-${quiz.title.toLowerCase().replace(/\s+/g, '-')}-${result.id}.pdf`;
    doc.save(filename || defaultFilename);
  }

  public downloadWithOptions(quiz: Quiz, result: QuizResult, options: PDFOptions = {}, filename?: string) {
    const doc = this.generatePDF(quiz, result, options);
    const defaultFilename = `quiz-results-${quiz.title.toLowerCase().replace(/\s+/g, '-')}-${result.id}.pdf`;
    doc.save(filename || defaultFilename);
  }
}

// Export a convenience function
export const generateQuizResultPDF = (quiz: Quiz, result: QuizResult, options?: PDFOptions) => {
  const generator = new QuizResultPDFGenerator();
  return generator.generatePDF(quiz, result, options);
};

export const downloadQuizResultPDF = (quiz: Quiz, result: QuizResult, filename?: string) => {
  const generator = new QuizResultPDFGenerator();
  generator.download(quiz, result, filename);
};

export const downloadQuizResultPDFWithOptions = (quiz: Quiz, result: QuizResult, options: PDFOptions = {}, filename?: string) => {
  const generator = new QuizResultPDFGenerator();
  generator.downloadWithOptions(quiz, result, options, filename);
};
