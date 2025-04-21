import easyinvoice from "easyinvoice";
import fs from "fs";

export const generateBill = async ({ customerName, products }) => {
  const invoiceData = {
    sender: {
      company: "IT General Store",
      address: "123 Main Street",
      zip: "421301",
      city: "Kalyan",
      country: "India"
    },
    client: {
      company: customerName,
      address: "N/A"
    },
    information: {
      number: "INV-" + Date.now(),
      date: new Date().toLocaleDateString()
    },
    products: products.map(p => ({
      quantity: p.quantity,
      description: p.name,
      "tax-rate": 0,
      price: p.unitPrice
    })),
    "bottom-notice": "Thank you for shopping!"
  };

  const result = await easyinvoice.createInvoice(invoiceData);
  return result.pdf;
};
