import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Gradient orbs for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-white/80 text-sm font-medium">MARS RETAIL TRADE OF
              CONSTRUCTION MATERIALS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Invoice Generator With{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Custom Templatess
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose your desired template.
            </p>
          </header>

          <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Template 1 Card */}
              <Link href="/editor?template=proforma-1">
                <div className="block rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ease-in-out group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="w-full h-auto overflow-hidden">
                    <Image
                      src="/images/temp1.png"
                      alt="Proforma Invoice Template"
                      width={400}
                      height={565}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-white mb-2">Classic Proforma</h3>
                    <p className="text-white/70">A clean and professional proforma invoice template.</p>
                  </div>
                </div>
              </Link>


              {/* Template 3 Card */}
              <Link href="/editor?template=proforma-3">
              <div className="block rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ease-in-out group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="w-full h-auto overflow-hidden bg-gray-200/10 flex items-center justify-center">
                    <Image
                      src="/images/temp3.png"
                      alt="Royal Blue Invoice Template"
                      width={400}
                      height={565}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-white mb-2">Modern Blue</h3>
                    <p className="text-white/70">A sleek and modern invoice with a blue accent.</p>
                  </div>
                </div>
              </Link>

              {/* Template 4 Card */}
              <Link href="/editor?template=proforma-4">
                <div className="block rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ease-in-out group hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                  <div className="w-full h-auto overflow-hidden bg-green-100/10 flex items-center justify-center">
                    <Image
                      src="/images/temp2.png"
                      alt="Green Invoice Template"
                      width={400}
                      height={565}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-white mb-2">Green Modern</h3>
                    <p className="text-white/70">A fresh green theme for a modern invoice look.</p>
                  </div>
                </div>
              </Link>
            </div>

            
          </main>
        </div>
      </div>
    </div>
  )
}
