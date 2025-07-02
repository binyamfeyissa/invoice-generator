import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

// --- REPEATING HEADER: Logo and "PROFORMA INVOICE" text ---
const RepeatingHeader = () => (
  <div className="flex justify-between items-start pb-2 border-b-2 border-orange-500">
    <div className="flex items-center space-x-4">
      <Image src="/images/logo.png" alt="Mars Logo" width={60} height={60} />
      <div>
        <h1 className="font-bold text-base text-gray-800">MARS RETAIL TRADE OF</h1>
        <h1 className="font-bold text-base text-gray-800">CONSTRUCTION MATERIALS</h1>
      </div>
    </div>
    <div className="text-right">
      <h2 className="text-lg font-bold text-orange-500">PROFORMA</h2>
      <h2 className="text-lg font-bold text-orange-500">INVOICE</h2>
    </div>
  </div>
)

// --- CUSTOMER DETAILS: Only for the first page ---
const CustomerDetailsSection = ({ data }) => (
  <section className="my-6 flex justify-between text-xs">
    <div>
      <p className="font-bold text-gray-600">Invoice to:</p>
      <p className="font-bold text-sm">{data.invoiceTo.name}</p>
      <p>TIN: {data.invoiceTo.tin}</p>
    </div>
    <div className="text-right">
      <p>
        Invoice no: <span className="font-semibold">{data.invoiceDetails.no}</span>
      </p>
      <p>
        {new Date(data.invoiceDetails.date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
    </div>
  </section>
)

// --- FOOTER: Repeats on every page ---
const InvoiceFooter = () => (
  <footer className="text-[10px] text-orange-500 mt-4 pt-4 border-t-2 border-orange-300">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 w-full">
      <div className="flex flex-row items-start gap-1 w-full sm:w-1/3">
        <Phone className="w-3 h-3 text-orange-500 mt-0.5" />
        <div className="flex text-black flex-col">
          <span>+251913705830 /</span>
          <span>+251942222666</span>
        </div>
      </div>
      <div className="flex flex-row items-start gap-1 w-[80%] sm:w-1/3 mr-5">
        <Mail className="w-3 h-3 text-orange-500 mt-0.5" />
        <span className="text-black">biniyam@marssanitaryware.com</span>
      </div>
      <div className="flex flex-row items-start gap-1 w-full sm:w-1/3">
        <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
        <span className="text-black">Urael to Atlas Road, Next to Axum Building, First Floor</span>
      </div>
      {/* <div className="flex flex-row items-start gap-1 w-full sm:w-1/3">
        <MapPin className="w-6 h-6 text-orange-500 mt-0.5" />
        <span>Urael to Atlas Road, Next to Axum Building, First Floor, Addis Ababa, Ethiopia</span>
      </div> */}
    </div>
  </footer>
)

// --- FINAL SECTIONS: Only for the last page ---
const FinalSections = ({ data }) => {
  // Bank info logic
  const bankOptions = {
    DASHEN: { name: "DASHEN BANK (BINIYAM JEGNAW)", number: "5136322229011" },
    CBE: { name: "CBE (mars retail trade of construction materials)", number: "1000619377617" },
    AWASH: { name: "AWASH BANK (BINIYAM JEGNAW)", number: "13040457265900" },
    GADDA: { name: "GADDA BANK (BINIYAM JEGNAW)", number: "1000002358011" },
    SIINQEE: { name: "SIINQEE BANK (BINIYAM JEGNAW)", number: "1067859731210" },
    AMHARA: { name: "AMHARA BANK (BINIYAM JEGNAW)", number: "9900030525071" },
    HIBRET: { name: "HIBRET BANK (BINIYAM JEGNAW)", number: "1371813926040015" },
    CUSTOM: { name: data?.customBankName || "Custom Bank", number: data?.customBankNumber || "" }
  };
  const selectedBank = bankOptions[data?.bank] || bankOptions.DASHEN;
  return (
    <div className="mt-auto">
      <section className="pt-8 flex justify-between items-end">
        <div className="text-xs">
          <p className="font-semibold">Amount in words: {data?.amountInWords || <span className="italic text-gray-400">Enter amount in words</span>}</p>
          <p className="font-semibold">This proforma is valid for {data?.validityDays || <span className="italic text-gray-400">__</span>}  days only.</p>
          <p className="font-semibold">Prepared by: {data?.preparedBy || <span className="italic text-gray-400">Enter name</span>}</p>
          <div className="bg-orange-500 text-white font-bold py-1 px-3 mb-2 text-[11px] mt-2">
            PAYMENT METHOD:
          </div>
          <p className="font-semibold">Bank Name: {selectedBank.name}</p>
          <p className="font-semibold">Account Number: {selectedBank.number}</p>
          <p className="font-bold">Thank you for working with us!</p>
          <p className="font-bold">Terms and Conditions:</p>
          <p className="text-[11px]">{data?.terms || "Deposit before delivery"}</p>
        </div>
        <div className="text-center">
          <Image src="/images/stamp.png" alt="Company Stamp" width={90} height={90} className="ml-4"/>
          <p className="text-xs font-bold mt-2">BINIYAM JEGNAW</p>
          <p className="text-[11px]">GENERAL MANAGER</p>
        </div>
      </section>
    </div>
  );
}
const FINAL_SECTIONS_THRESHOLD = 1
// --- The new, robust pagination logic with custom rules ---
const paginate = (items) => {
  const FIRST_PAGE_CAPACITY = 12
  const INTERMEDIATE_PAGE_CAPACITY = 15
  const FINAL_PAGE_CAPACITY = 12
  const FINAL_SECTIONS_THRESHOLD = 12 // Show FinalSections on the same page if <= 12 items

  if (!items || items.length === 0) return [[]]

  const pages = []
  const totalItems = items.length
  let itemIndex = 0

  // Handle first page
  const firstPageItemCount = Math.min(totalItems, FIRST_PAGE_CAPACITY)
  pages.push(items.slice(itemIndex, firstPageItemCount))
  itemIndex += firstPageItemCount

  // Handle intermediate and last pages
  while (itemIndex < totalItems) {
    const remainingCount = totalItems - itemIndex
    if (remainingCount <= FINAL_PAGE_CAPACITY) {
      // All remaining items fit on the last page
      pages.push(items.slice(itemIndex))
      break
    } else {
      // Fill intermediate page to capacity (10)
      pages.push(items.slice(itemIndex, itemIndex + INTERMEDIATE_PAGE_CAPACITY))
      itemIndex += INTERMEDIATE_PAGE_CAPACITY
    }
  }

  return pages
}

const ProformaTemplate1 = ({ data, notValid }) => {
  const paginatedItems = paginate(data.items)
  const taxRate = data.taxRate || 0
  // Calculate pre-tax price and tax from price with tax included
  const subtotal = data.items.reduce((acc, item) => {
    const unitPriceWithTax = item.price || 0
    const unitPriceWithoutTax = unitPriceWithTax / (1 + taxRate / 100)
    return acc + unitPriceWithoutTax * (item.qty || 0)
  }, 0)
  const totalTax = data.items.reduce((acc, item) => {
    const unitPriceWithTax = item.price || 0
    const unitPriceWithoutTax = unitPriceWithTax / (1 + taxRate / 100)
    const taxAmountPerUnit = unitPriceWithTax - unitPriceWithoutTax
    return acc + taxAmountPerUnit * (item.qty || 0)
  }, 0)
  const total = subtotal + totalTax

  const firstPageItems = paginatedItems[0]
  const lastPageItems = paginatedItems[paginatedItems.length - 1]
  const FINAL_PAGE_CAPACITY = 9
  let showFinalSectionsOnNewPage = false

  if (paginatedItems.length === 1) {
    // Only one page: threshold is 6
    showFinalSectionsOnNewPage = firstPageItems.length > 6
  } else if (firstPageItems.length > 6) {
    // Multi-page: use previous logic
    showFinalSectionsOnNewPage = lastPageItems.length > FINAL_PAGE_CAPACITY
  } else {
    showFinalSectionsOnNewPage = lastPageItems.length > FINAL_SECTIONS_THRESHOLD
  }

  return (
    <>
      {paginatedItems.map((pageItems, pageIndex) => (
        <div
          key={pageIndex}
          className="invoice-page bg-white shadow-lg w-[595px] h-[842px] p-8 flex flex-col mb-8 text-gray-800 relative overflow-hidden"
        >
          {/* Watermark */}
          {notValid && (
            <div
              className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                zIndex: 50,
                opacity: 0.13,
                fontSize: 90,
                color: '#e53e3e',
                fontWeight: 'bold',
                transform: 'translate(-50%, -50%) rotate(-30deg)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              NOT VALID
            </div>
          )}
          <header>
            <RepeatingHeader />
            {pageIndex === 0 && <CustomerDetailsSection data={data} />}
          </header>

          <main className="flex-grow flex flex-col min-h-0">
            <section className="flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 font-semibold text-xs">NO.</th>
                    <th className="p-2 font-semibold text-xs">ITEMS</th>
                    <th className="p-2 font-semibold text-xs">UNIT</th>
                    <th className="p-2 text-right font-semibold text-xs">QTY</th>
                    <th className="p-2 text-right font-semibold text-xs">UNIT PRICE</th>
                    <th className="p-2 text-right font-semibold text-xs">TOTAL PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item, index) => {
                    // Find the global index of this item in the original data.items array
                    const globalIndex = data.items.indexOf(item)
                    const unitPriceWithTax = Number(item.price) || 0
                    const unitPriceWithoutTax = unitPriceWithTax / (1 + taxRate / 100)
                    const taxAmountPerUnit = unitPriceWithTax - unitPriceWithoutTax
                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-xs">{globalIndex + 1}</td>
                        <td className="p-2 text-xs">{item.product}</td>
                        <td className="p-2 text-xs">{item.unit === 'CUSTOM' ? item.customUnit : (item.unit || 'PCS')}</td>
                        <td className="p-2 text-right text-xs">{item.qty || 0}</td>
                        <td className="p-2 text-right text-xs">{unitPriceWithoutTax.toFixed(2)}</td>
                        <td className="p-2 text-right text-xs">{(unitPriceWithoutTax * (item.qty || 0)).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                {pageIndex === paginatedItems.length - 1 && (
                  <tfoot>
                    <tr className="border-t-2 border-gray-400">
                      <td colSpan="4" />
                      <td className="p-2 text-right text-xs font-bold">Sub Total</td>
                      <td className="p-2 text-right text-xs">{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" />
                      <td className="p-2 text-right text-xs font-bold">VAT ({taxRate.toFixed(2)}%)</td>
                      <td className="p-2 text-right text-xs">{totalTax.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-gray-800 text-white">
                      <td colSpan="4" />
                      <td className="p-2 text-right text-xs font-bold">Grand Total</td>
                      <td className="p-2 text-right text-xs font-bold">{total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </section>

            {/* Only show FinalSections on the last page if it should NOT be on a new page */}
            {pageIndex === paginatedItems.length - 1 && !showFinalSectionsOnNewPage && <FinalSections data={data} />}
          </main>

          <InvoiceFooter />
        </div>
      ))}
      {/* If needed, render FinalSections on a new page */}
      {showFinalSectionsOnNewPage && (
        <div className="invoice-page bg-white shadow-lg w-[595px] h-[842px] p-8 flex flex-col mb-8 text-gray-800 relative overflow-hidden">
          {/* Watermark */}
          {notValid && (
            <div
              className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                zIndex: 50,
                opacity: 0.13,
                fontSize: 90,
                color: '#e53e3e',
                fontWeight: 'bold',
                transform: 'translate(-50%, -50%) rotate(-30deg)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              NOT VALID
            </div>
          )}
          <header>
            <RepeatingHeader />
          </header>
          <main className="flex-grow flex flex-col min-h-0">
            <FinalSections data={data} />
          </main>
          <InvoiceFooter />
        </div>
      )}
    </>
  )
}

export default ProformaTemplate1
