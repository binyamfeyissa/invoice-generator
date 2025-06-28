import Image from "next/image"
import { Phone, Mail } from "lucide-react"

// --- REPEATING HEADER: Logo and "PROFORMA INVOICE" text ---
const RepeatingHeader = () => (
  <div className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
    <div className="flex items-center space-x-4">
      <Image src="/images/logo.png" alt="Mars Logo" width={50} height={50} />
      <div>
        <h1 className="font-bold text-base text-gray-800">MARS RETAIL TRADE OF CONSTRUCTION MATERIALS</h1>
      </div>
    </div>
    <div className="text-right">
      <h2 className="text-2xl font-bold text-gray-700">PROFORMA INVOICE</h2>
    </div>
  </div>
)

// --- CUSTOMER DETAILS: Only for the first page ---
const CustomerDetailsSection = ({ data }) => (
  <section className="my-6 grid grid-cols-2 gap-4">
    <div>
      <p className="font-semibold text-sm text-gray-500 mb-1">Billed To</p>
      <p className="font-bold text-base">{data.invoiceTo.name}</p>
      <p className="text-sm">TIN: {data.invoiceTo.tin}</p>
    </div>
    <div className="text-right">
      <div className="mb-2">
        <p className="font-semibold text-sm text-gray-500">Invoice Number</p>
        <p className="font-bold text-base">{data.invoiceDetails.no}</p>
      </div>
      <div>
        <p className="font-semibold text-sm text-gray-500">Date of Issue</p>
        <p className="font-bold text-base">
          {new Date(data.invoiceDetails.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
    </div>
  </section>
)

// --- FOOTER: Repeats on every page ---
const InvoiceFooter = () => (
  <footer className="text-xs text-gray-500 mt-auto pt-4 border-t-2 border-gray-100 text-center">
    <p>Thank you for your business!</p>
    <div className="flex justify-center items-center space-x-4 mt-2">
      <div className="flex items-center space-x-1">
        <Phone className="w-3 h-3" />
        <span>+251913705830 / +251942222666</span>
      </div>
      <div className="flex items-center space-x-1">
        <Mail className="w-3 h-3" />
        <span>biniyamjegnaw@icloud.com</span>
      </div>
    </div>
  </footer>
)

// --- FINAL SECTIONS: Only for the last page ---
const FinalSections = ({ data }) => {
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
    <div className="mt-auto flex justify-between items-end pt-6">
      <div className="w-1/2">
        <div className="mb-2 text-xs">
          <span className="font-bold">Amount in words:</span> {data?.amountInWords || <span className="italic text-gray-400">Enter amount in words</span>}
        </div>
        <div className="mb-2 text-xs">
          <span className="font-bold">This proforma is valid for </span>
          {data?.validityDays || <span className="italic text-gray-400">__</span>}
          <span className="font-bold"> days only.</span>
        </div>
        <div className="mb-2 text-xs">
          <span className="font-bold">Prepared by:</span> {data?.preparedBy || <span className="italic text-gray-400">Enter name</span>}
        </div>
        <div className="bg-orange-500 text-white font-bold py-1 px-3 mb-2 text-[11px] mt-2">
          PAYMENT METHOD:
        </div>
        <p className="font-semibold">Bank Name: {selectedBank.name}</p>
        <p className="font-semibold">Account Number: {selectedBank.number}</p>
        <p className="font-bold">Thank you for working with us!</p>
        <p className="font-bold">Terms and Conditions:</p>
        <p className="text-[11px]">{data?.terms || "Deposit before delivery"}</p>
      </div>
      <div className="w-1/2 flex justify-end">
        <div className="text-center">
          <Image src="/images/stamp.png" alt="Company Stamp" width={100} height={100} />
          <p className="font-bold mt-2 text-sm">BINIYAM JEGNAW</p>
          <p className="text-xs text-gray-500">GENERAL MANAGER</p>
        </div>
      </div>
    </div>
  );
}

// --- The robust pagination logic ---
const paginate = (items) => {
  const FIRST_PAGE_CAPACITY = 10
  const INTERMEDIATE_PAGE_CAPACITY = 13
  const FINAL_PAGE_CAPACITY = 4

  if (!items || items.length === 0) return [[]]

  const pages = []
  const totalItems = items.length
  let itemIndex = 0

  // Handle first page
  const firstPageItemCount = Math.min(totalItems, FIRST_PAGE_CAPACITY)
  pages.push(items.slice(itemIndex, firstPageItemCount))
  itemIndex += firstPageItemCount

  // Handle subsequent pages
  while (itemIndex < totalItems) {
    const remainingCount = totalItems - itemIndex

    if (remainingCount <= FINAL_PAGE_CAPACITY) {
      pages.push(items.slice(itemIndex))
      break
    } else if (remainingCount <= INTERMEDIATE_PAGE_CAPACITY) {
      const splitIndex = remainingCount - FINAL_PAGE_CAPACITY
      pages.push(items.slice(itemIndex, itemIndex + splitIndex))
      pages.push(items.slice(itemIndex + splitIndex))
      break
    } else {
      pages.push(items.slice(itemIndex, itemIndex + INTERMEDIATE_PAGE_CAPACITY))
      itemIndex += INTERMEDIATE_PAGE_CAPACITY
    }
  }

  if (pages.length > 1) {
    const lastPage = pages[pages.length - 1]
    const secondLastPage = pages[pages.length - 2]
    if (lastPage.length > FINAL_PAGE_CAPACITY) {
      const combined = secondLastPage.concat(lastPage)
      const newSecondLastPage = combined.slice(0, combined.length - FINAL_PAGE_CAPACITY)
      const newLastPage = combined.slice(combined.length - FINAL_PAGE_CAPACITY)
      pages.splice(pages.length - 2, 2, newSecondLastPage, newLastPage)
    }
  } else if (pages.length === 1 && pages[0].length > FINAL_PAGE_CAPACITY) {
    const singlePage = pages[0]
    const splitIndex = singlePage.length - FINAL_PAGE_CAPACITY
    pages.splice(0, 1, singlePage.slice(0, splitIndex), singlePage.slice(splitIndex))
  }

  return pages
}

const ProformaTemplate2 = ({ data }) => {
  const paginatedItems = paginate(data.items)
  const subtotal = data.items.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0)
  const taxAmount = (subtotal * data.taxRate) / 100
  const total = subtotal + taxAmount

  return (
    <>
      {paginatedItems.map((pageItems, pageIndex) => (
        <div
          key={pageIndex}
          className="invoice-page bg-white shadow-lg w-[595px] h-[842px] p-10 flex flex-col mb-8 font-sans"
        >
          <header>
            <RepeatingHeader />
            {pageIndex === 0 && <CustomerDetailsSection data={data} />}
          </header>

          <main className="flex-grow flex flex-col min-h-0 mt-4">
            <section className="flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="p-2 text-sm font-semibold text-gray-500 uppercase">Product</th>
                    <th className="p-2 text-right text-sm font-semibold text-gray-500 uppercase">Price</th>
                    <th className="p-2 text-right text-sm font-semibold text-gray-500 uppercase">Qty</th>
                    <th className="p-2 text-right text-sm font-semibold text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-2 text-sm">{item.product}</td>
                      <td className="p-2 text-right text-sm">ETB {Number.parseFloat(item.price || 0).toFixed(2)}</td>
                      <td className="p-2 text-right text-sm">{item.qty || 0}</td>
                      <td className="p-2 text-right text-sm">ETB {((item.price || 0) * (item.qty || 0)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                {pageIndex === paginatedItems.length - 1 && (
                  <tfoot>
                    <tr>
                      <td colSpan="2" />
                      <td className="p-2 text-right text-sm text-gray-600">Subtotal</td>
                      <td className="p-2 text-right text-sm">ETB {subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" />
                      <td className="p-2 text-right text-sm text-gray-600">Tax ({data.taxRate}%)</td>
                      <td className="p-2 text-right text-sm">ETB {taxAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan="2" />
                      <td className="p-2 text-right text-base">Total</td>
                      <td className="p-2 text-right text-base">ETB {total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </section>

            {pageIndex === paginatedItems.length - 1 && <FinalSections data={data} />}
          </main>

          <InvoiceFooter />
        </div>
      ))}
    </>
  )
}

export default ProformaTemplate2
