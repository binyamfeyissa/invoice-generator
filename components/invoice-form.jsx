"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, PlusCircle } from "lucide-react"

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
    setData({ ...data, items })
  }

  const handleAddItem = () => {
    setData({
      ...data,
      items: [...data.items, { product: "", price: 0, qty: 1 }],
    })
  }

  const handleRemoveItem = (index) => {
    const items = [...data.items]
    items.splice(index, 1)
    setData({ ...data, items })
  }

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
                <div className="grid grid-cols-2 gap-4">
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
