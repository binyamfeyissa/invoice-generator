"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, PlusCircle } from "lucide-react"
import { useEffect } from "react"

// Helper function to convert number to words (simple version for ETB)
function numberToWords(num) {
  if (typeof num !== "number" || isNaN(num)) return "";
  const ones = ["zero","one","two","three","four","five","six","seven","eight","nine"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? "-" + ones[num % 10] : "");
  if (num < 1000) return ones[Math.floor(num / 100)] + " hundred" + (num % 100 ? " and " + numberToWords(num % 100) : "");
  if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "");
  return num.toString();
}

export default function InvoiceForm({ data, setData }) {
  const handleClientChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, invoiceTo: { ...data.invoiceTo, [name]: value } })
  }

  const handleDetailsChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, invoiceDetails: { ...data.invoiceDetails, [name]: value } })
  }

  const handleItemChange = (index, e) => {
    const { name, value } = e.target
    const items = [...data.items]
    items[index][name] = value
    // If unit is changed and not 'CUSTOM', clear customUnit
    if (name === 'unit' && value !== 'CUSTOM') {
      items[index].customUnit = ''
    }
    setData({ ...data, items })
  }

  const handleAddItem = () => {
    setData({
      ...data,
      items: [...data.items, { product: '', unit: 'PCS', customUnit: '', price: 0, qty: 1 }],
    })
  }

  const handleRemoveItem = (index) => {
    const items = [...data.items]
    items.splice(index, 1)
    setData({ ...data, items })
  }

  useEffect(() => {
    // Calculate grand total using new logic (unit price includes tax)
    const taxRate = parseFloat(data.taxRate) || 0;
    const subtotal = data.items.reduce((acc, item) => {
      const unitPriceWithTax = parseFloat(item.price) || 0;
      const unitPriceWithoutTax = unitPriceWithTax / (1 + taxRate / 100);
      return acc + unitPriceWithoutTax * (parseFloat(item.qty) || 0);
    }, 0);
    const totalTax = data.items.reduce((acc, item) => {
      const unitPriceWithTax = parseFloat(item.price) || 0;
      const unitPriceWithoutTax = unitPriceWithTax / (1 + taxRate / 100);
      const taxAmountPerUnit = unitPriceWithTax - unitPriceWithoutTax;
      return acc + taxAmountPerUnit * (parseFloat(item.qty) || 0);
    }, 0);
    const grandTotal = subtotal + totalTax;
    // Only auto-fill if user hasn't typed in amountInWords or it's empty
    if (!data.amountInWords || data.amountInWordsAuto) {
      setData(prev => ({
        ...prev,
        amountInWords: numberToWords(Math.round(grandTotal)) + " birr only",
        amountInWordsAuto: true
      }));
    }
    // eslint-disable-next-line
  }, [data.items, data.taxRate]);

  // If user edits the field, remove the auto flag
  const handleAmountInWordsChange = (e) => {
    setData({ ...data, amountInWords: e.target.value, amountInWordsAuto: false });
  };

  // Set default values for validityDays, preparedBy, terms, and bank if not set
  useEffect(() => {
    if (!data.validityDays || data.validityDays === "") {
      setData(prev => ({ ...prev, validityDays: "10" }));
    }
    if (!data.preparedBy || data.preparedBy === "") {
      setData(prev => ({ ...prev, preparedBy: "BINIYAM JEGNAW" }));
    }
    if (!data.terms || data.terms === "") {
      setData(prev => ({ ...prev, terms: "Deposit before delivery" }));
    }
    if (!data.bank || data.bank === "") {
      setData(prev => ({ ...prev, bank: "DASHEN" }));
    }
    // eslint-disable-next-line
  }, []);

  const bankOptions = [
    { value: "DASHEN", label: "DASHEN BANK (BINIYAM JEGNAW)", number: "5136322229011" },
    { value: "CBE", label: "CBE (mars retail trade of construction materials)", number: "1000619377617" },
    { value: "AWASH", label: "AWASH BANK (BINIYAM JEGNAW)", number: "13040457265900" },
    { value: "GADDA", label: "GADDA BANK (BINIYAM JEGNAW)", number: "1000002358011" },
    { value: "SIINQEE", label: "SIINQEE BANK (BINIYAM JEGNAW)", number: "1067859731210" },
    { value: "AMHARA", label: "AMHARA BANK (BINIYAM JEGNAW)", number: "9900030525071" },
    { value: "HIBRET", label: "HIBRET BANK (BINIYAM JEGNAW)", number: "1371813926040015" },
    { value: "CUSTOM", label: "Custom Bank", number: "" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bill To</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Customer Name</Label>
            <Input id="name" name="name" value={data.invoiceTo.name} onChange={handleClientChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tin">TIN</Label>
            <Input id="tin" name="tin" value={data.invoiceTo.tin} onChange={handleClientChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="no">Invoice No.</Label>
            <Input id="no" name="no" value={data.invoiceDetails.no} onChange={handleDetailsChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Invoice Date</Label>
            <Input id="date" name="date" type="date" value={data.invoiceDetails.date} onChange={handleDetailsChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              name="taxRate"
              type="number"
              value={data.taxRate}
              onChange={(e) => setData({ ...data, taxRate: Number.parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <input
              id="notValid"
              name="notValid"
              type="checkbox"
              checked={!!data.notValid}
              onChange={e => setData({ ...data, notValid: e.target.checked })}
              className="accent-orange-500 w-4 h-4"
            />
            <Label htmlFor="notValid" className="text-xs font-medium text-gray-700">Show NOT VALID Watermark</Label>
          </div>
          {/* New fields for amount in words, validity days, prepared by */}
          <div className="space-y-2 pt-4">
            <Label htmlFor="amountInWords">Amount in Words</Label>
            <Input
              id="amountInWords"
              name="amountInWords"
              value={data.amountInWords || ''}
              onChange={handleAmountInWordsChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="validityDays">Proforma Validity (days)</Label>
            <Input
              id="validityDays"
              name="validityDays"
              type="number"
              value={data.validityDays || '10'}
              onChange={e => setData({ ...data, validityDays: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preparedBy">Prepared By</Label>
            <Input
              id="preparedBy"
              name="preparedBy"
              value={data.preparedBy || 'BINIYAM JEGNAW'}
              onChange={e => setData({ ...data, preparedBy: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Input
              id="terms"
              name="terms"
              value={data.terms || 'Deposit before delivery'}
              onChange={e => setData({ ...data, terms: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank">Bank Account</Label>
            <select
              id="bank"
              name="bank"
              className="w-full border rounded px-2 py-1"
              value={data.bank || 'DASHEN'}
              onChange={e => setData({ ...data, bank: e.target.value })}
            >
              {bankOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {data.bank === 'CUSTOM' && (
            <div className="space-y-2">
              <Label htmlFor="customBankName">Custom Bank Name (Account owner name)</Label>
              <Input
                id="customBankName"
                name="customBankName"
                value={data.customBankName || ''}
                onChange={e => setData({ ...data, customBankName: e.target.value })}
              />
              <Label htmlFor="customBankNumber">Custom Bank Account Number</Label>
              <Input
                id="customBankNumber"
                name="customBankNumber"
                value={data.customBankNumber || ''}
                onChange={e => setData({ ...data, customBankNumber: e.target.value })}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="p-4 border rounded-md space-y-2 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`product-${index}`}>Product</Label>
                  <Input
                    id={`product-${index}`}
                    name="product"
                    value={item.product}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`unit-${index}`}>Unit</Label>
                    <select
                      id={`unit-${index}`}
                      name="unit"
                      className="w-full border rounded px-2 py-1"
                      value={item.unit || 'PCS'}
                      onChange={(e) => handleItemChange(index, e)}
                    >
                      <option value="PCS">PCS</option>
                      <option value="meter">meter</option>
                      <option value="CUSTOM">Custom</option>
                    </select>
                    {item.unit === 'CUSTOM' && (
                      <Input
                        className="mt-2"
                        placeholder="Enter custom unit"
                        name="customUnit"
                        value={item.customUnit || ''}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`qty-${index}`}>Qty</Label>
                    <Input
                      id={`qty-${index}`}
                      name="qty"
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      name="price"
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={handleAddItem} className="w-full bg-transparent">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
