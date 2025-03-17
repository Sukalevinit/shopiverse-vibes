
import { jsPDF } from "jspdf";
import { CartItem, CheckoutDetails } from "@/types";

export const generateReceiptPDF = (
  items: CartItem[],
  checkoutDetails: CheckoutDetails,
  orderId: string,
  total: number
): string => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add company logo/name
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ShopiverseVibes", pageWidth / 2, 20, { align: "center" });
  
  // Add receipt header
  doc.setFontSize(16);
  doc.text("Purchase Receipt", pageWidth / 2, 30, { align: "center" });
  
  // Add date and order ID
  const date = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${date}`, 20, 40);
  doc.text(`Order ID: ${orderId}`, 20, 45);
  
  // Add customer information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Information", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${checkoutDetails.fullName}`, 20, 62);
  doc.text(`Email: ${checkoutDetails.email}`, 20, 67);
  doc.text(`Address: ${checkoutDetails.address}`, 20, 72);
  doc.text(`${checkoutDetails.city}, ${checkoutDetails.postalCode}`, 20, 77);
  doc.text(`Country: ${checkoutDetails.country}`, 20, 82);
  doc.text(`Payment Method: ${checkoutDetails.paymentMethod}`, 20, 87);
  
  // Add items table header
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Order Details", 20, 97);
  
  const itemsStartY = 105;
  let yPosition = itemsStartY;
  
  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPosition - 5, pageWidth - 40, 8, "F");
  doc.text("Item", 25, yPosition);
  doc.text("Price", pageWidth - 85, yPosition);
  doc.text("Qty", pageWidth - 65, yPosition);
  doc.text("Total", pageWidth - 45, yPosition);
  
  yPosition += 10;
  
  // Table rows
  doc.setFont("helvetica", "normal");
  items.forEach((item) => {
    if (yPosition > 250) {
      // Add new page if needed
      doc.addPage();
      yPosition = 20;
    }
    
    // Truncate long product names
    const productName = 
      item.product.name.length > 30 
        ? item.product.name.substring(0, 27) + "..." 
        : item.product.name;
    
    doc.text(productName, 25, yPosition);
    doc.text(`$${item.product.price.toFixed(2)}`, pageWidth - 85, yPosition);
    doc.text(item.quantity.toString(), pageWidth - 65, yPosition);
    doc.text(
      `$${(item.product.price * item.quantity).toFixed(2)}`,
      pageWidth - 45,
      yPosition
    );
    
    yPosition += 8;
  });
  
  // Draw line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;
  
  // Add total
  doc.setFont("helvetica", "bold");
  doc.text("Total:", pageWidth - 65, yPosition);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 45, yPosition);
  
  // Add footer
  yPosition += 20;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for shopping with ShopiverseVibes!", pageWidth / 2, yPosition, { align: "center" });
  doc.text("For questions or support, contact support@shopiversevibes.com", pageWidth / 2, yPosition + 5, { align: "center" });
  
  // Return data URL for the PDF
  return doc.output("datauristring");
};

// Function to generate a random order ID
export const generateOrderId = (): string => {
  return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Function to download the PDF directly
export const downloadReceiptPDF = (
  items: CartItem[],
  checkoutDetails: CheckoutDetails,
  orderId: string,
  total: number
): void => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add company logo/name
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ShopiverseVibes", pageWidth / 2, 20, { align: "center" });
  
  // Add receipt header
  doc.setFontSize(16);
  doc.text("Purchase Receipt", pageWidth / 2, 30, { align: "center" });
  
  // Add date and order ID
  const date = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${date}`, 20, 40);
  doc.text(`Order ID: ${orderId}`, 20, 45);
  
  // Add customer information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Information", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${checkoutDetails.fullName}`, 20, 62);
  doc.text(`Email: ${checkoutDetails.email}`, 20, 67);
  doc.text(`Address: ${checkoutDetails.address}`, 20, 72);
  doc.text(`${checkoutDetails.city}, ${checkoutDetails.postalCode}`, 20, 77);
  doc.text(`Country: ${checkoutDetails.country}`, 20, 82);
  doc.text(`Payment Method: ${checkoutDetails.paymentMethod}`, 20, 87);
  
  // Add items table header
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Order Details", 20, 97);
  
  const itemsStartY = 105;
  let yPosition = itemsStartY;
  
  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPosition - 5, pageWidth - 40, 8, "F");
  doc.text("Item", 25, yPosition);
  doc.text("Price", pageWidth - 85, yPosition);
  doc.text("Qty", pageWidth - 65, yPosition);
  doc.text("Total", pageWidth - 45, yPosition);
  
  yPosition += 10;
  
  // Table rows
  doc.setFont("helvetica", "normal");
  items.forEach((item) => {
    if (yPosition > 250) {
      // Add new page if needed
      doc.addPage();
      yPosition = 20;
    }
    
    // Truncate long product names
    const productName = 
      item.product.name.length > 30 
        ? item.product.name.substring(0, 27) + "..." 
        : item.product.name;
    
    doc.text(productName, 25, yPosition);
    doc.text(`$${item.product.price.toFixed(2)}`, pageWidth - 85, yPosition);
    doc.text(item.quantity.toString(), pageWidth - 65, yPosition);
    doc.text(
      `$${(item.product.price * item.quantity).toFixed(2)}`,
      pageWidth - 45,
      yPosition
    );
    
    yPosition += 8;
  });
  
  // Draw line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;
  
  // Add total
  doc.setFont("helvetica", "bold");
  doc.text("Total:", pageWidth - 65, yPosition);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 45, yPosition);
  
  // Add footer
  yPosition += 20;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for shopping with ShopiverseVibes!", pageWidth / 2, yPosition, { align: "center" });
  doc.text("For questions or support, contact support@shopiversevibes.com", pageWidth / 2, yPosition + 5, { align: "center" });
  
  // Save the PDF for download with a proper filename
  doc.save(`ShopiverseVibes_Receipt_${orderId}.pdf`);
};
