import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 한글 폰트 지원을 위한 설정
 * jsPDF는 기본적으로 한글을 지원하지 않아 이미지로 변환하는 방식 사용
 */

/**
 * HTML 요소를 PDF로 변환
 */
export const generatePDFFromHTML = async (element, filename = '사주풀이결과.pdf') => {
  try {
    // HTML 요소를 캔버스로 변환
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 너비 (mm)
    const pageHeight = 297; // A4 높이 (mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // 첫 페이지
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 여러 페이지 처리
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // PDF 다운로드
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return false;
  }
};

/**
 * 사주 결과 데이터로 PDF 직접 생성
 * (한글 폰트 문제로 현재는 HTML to PDF 방식 사용)
 */
export const generateSajuPDF = async (result, birthInfo) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 제목
    pdf.setFontSize(24);
    pdf.text('사주 풀이 결과', pageWidth / 2, 20, { align: 'center' });

    // 생년월일시
    pdf.setFontSize(12);
    const birthText = `${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일 ${birthInfo.hour}시`;
    pdf.text(birthText, pageWidth / 2, 35, { align: 'center' });

    // 구분선
    pdf.setLineWidth(0.5);
    pdf.line(20, 40, pageWidth - 20, 40);

    // 사주팔자
    pdf.setFontSize(16);
    pdf.text('사주팔자', 20, 55);

    let yPos = 65;
    pdf.setFontSize(12);

    // 년주, 월주, 일주, 시주 (한글은 깨질 수 있음)
    const pillars = [
      `년주: ${result.saju_result.year_pillar.heavenly_stem}${result.saju_result.year_pillar.earthly_branch}`,
      `월주: ${result.saju_result.month_pillar.heavenly_stem}${result.saju_result.month_pillar.earthly_branch}`,
      `일주: ${result.saju_result.day_pillar.heavenly_stem}${result.saju_result.day_pillar.earthly_branch}`,
      `시주: ${result.saju_result.hour_pillar.heavenly_stem}${result.saju_result.hour_pillar.earthly_branch}`
    ];

    pillars.forEach(pillar => {
      pdf.text(pillar, 20, yPos);
      yPos += 10;
    });

    // AI 해석
    yPos += 10;
    pdf.setFontSize(16);
    pdf.text('AI 해석', 20, yPos);
    yPos += 10;

    pdf.setFontSize(10);
    const interpretation = result.interpretation.interpretation;
    const lines = pdf.splitTextToSize(interpretation, pageWidth - 40);

    lines.forEach(line => {
      if (yPos > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(line, 20, yPos);
      yPos += 7;
    });

    // 푸터
    pdf.setFontSize(8);
    pdf.text('Made with Claude AI', pageWidth / 2, pageHeight - 10, { align: 'center' });

    pdf.save('사주풀이결과.pdf');
    return true;
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return false;
  }
};

/**
 * PDF 미리보기 URL 생성
 */
export const generatePDFPreviewURL = async (element) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Blob URL 생성
    const blob = pdf.output('blob');
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('PDF 미리보기 생성 오류:', error);
    return null;
  }
};

/**
 * 인쇄 최적화된 PDF 생성
 */
export const generatePrintablePDF = async (element, filename = '사주풀이결과.pdf') => {
  try {
    const canvas = await html2canvas(element, {
      scale: 3, // 인쇄용 고해상도
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    return false;
  }
};
