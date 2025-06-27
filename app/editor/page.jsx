"use client"

import { useState, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import InvoiceForm from "@/components/invoice-form"
import ProformaTemplate1 from "@/components/templates/proforma-template-1"
import ProformaTemplate2 from "@/components/templates/proforma-template-2"
import ProformaTemplate3 from "@/components/templates/proforma-template-3"
import ProformaTemplate4 from "@/components/templates/proforma-template-4"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

function EditorContent() {
  const searchParams = useSearchParams()
  const template = searchParams.get("template")
  const invoiceContainerRef = useRef()
  const [loading, setLoading] = useState(false)

  const [invoiceData, setInvoiceData] = useState({
    invoiceTo: {
      name: "Sample Customer",
      tin: "0026112353",
    },
    invoiceDetails: {
      no: "INV-001",
      date: new Date().toISOString().split("T")[0],
    },
    items: Array.from({ length: 1 }, (_, i) => ({
      product: `Item Number ${i + 1}`,
      price: 100 + i * 10,
      qty: 1,
    })),
    taxRate: 15,
  })

  const handleDownloadPdf = () => {
    setLoading(true)
    const container = invoiceContainerRef.current
    if (!container) {
      setLoading(false)
      return
    }

    const pages = container.querySelectorAll(".invoice-page")
    const pdf = new jsPDF("p", "pt", "a4")
    const a4Width = 595
    const a4Height = 842

    const promises = Array.from(pages).map((page) =>
      html2canvas(page, {
        scale: 4, // Increased scale for higher quality
        useCORS: true,
        logging: false,
        width: page.offsetWidth,
        height: page.offsetHeight,
      }),
    )

    Promise.all(promises).then((canvases) => {
      canvases.forEach((canvas, index) => {
        if (index > 0) {
          pdf.addPage()
        }
        const imgData = canvas.toDataURL("image/png")
        // Use the canvas's actual width and height for better quality
        const imgWidth = a4Width
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        let heightLeft = imgHeight
        if (heightLeft > a4Height) heightLeft = a4Height

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, heightLeft, undefined, 'FAST')
      })
      pdf.save(`invoice-${invoiceData.invoiceDetails.no}.pdf`)
      setLoading(false)
    })
  }

  const renderTemplate = () => {
    switch (template) {
      case "proforma-1":
        return <ProformaTemplate1 data={invoiceData} notValid={!!invoiceData.notValid} />
      case "proforma-2":
        return <ProformaTemplate2 data={invoiceData} notValid={!!invoiceData.notValid} />
      case "proforma-3":
        return <ProformaTemplate3 data={invoiceData} notValid={!!invoiceData.notValid} />
      case "proforma-4":
        return <ProformaTemplate4 data={invoiceData} notValid={!!invoiceData.notValid} />
      default:
        return (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            Please select a template from the home page.
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200 font-sans">
      {/* --- Left Panel: Form --- */}
      <aside className="w-full md:w-[400px] lg:w-[450px] bg-white flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Invoice Details</h2>
          <Button onClick={handleDownloadPdf} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download PDF
          </Button>
        </div>
        <div className="overflow-y-auto flex-grow p-6">
          <InvoiceForm data={invoiceData} setData={setInvoiceData} />
        </div>
      </aside>

      {/* --- Right Panel: Preview --- */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div ref={invoiceContainerRef} className="flex flex-col items-center">
          {renderTemplate()}
        </div>
      </main>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-xl">Loading Editor...</div>}>
      <EditorContent />
    </Suspense>
  )
}
