import Link from "next/link"
import { Sparkles, Video, Layout, PencilLine, ChevronRight, LayoutPanelLeft } from "lucide-react"
import { MobileNav } from "@/components/layout/MobileNav"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateEntryPage() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-lg mx-auto">
      <header className="pt-4">
        <h1 className="text-3xl font-bold font-headline text-primary">Let's create</h1>
        <p className="text-muted-foreground mt-1">Choose a starting point for your content.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <Link href="/create/ai">
          <Card className="border-none shadow-lg shadow-primary/10 overflow-hidden group hover:scale-[1.02] transition-transform">
            <CardContent className="p-0 flex h-32">
              <div className="w-1/3 bg-primary flex items-center justify-center">
                <Sparkles className="text-white h-10 w-10 animate-pulse" />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center relative bg-white">
                <h3 className="text-lg font-bold">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Carousels, Reels & Captions</p>
                <ChevronRight className="absolute right-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/templates">
          <Card className="border-none shadow-lg shadow-accent/10 overflow-hidden group hover:scale-[1.02] transition-transform">
            <CardContent className="p-0 flex h-32">
              <div className="w-1/3 bg-accent flex items-center justify-center">
                <LayoutPanelLeft className="text-white h-10 w-10" />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center relative bg-white">
                <h3 className="text-lg font-bold">Template Library</h3>
                <p className="text-sm text-muted-foreground">Pro Layouts & Formats</p>
                <ChevronRight className="absolute right-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/create/editor">
          <Card className="border-none shadow-lg shadow-slate-200 overflow-hidden group hover:scale-[1.02] transition-transform">
            <CardContent className="p-0 flex h-32">
              <div className="w-1/3 bg-slate-800 flex items-center justify-center">
                <PencilLine className="text-white h-10 w-10" />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center relative bg-white">
                <h3 className="text-lg font-bold">Blank Canvas</h3>
                <p className="text-sm text-muted-foreground">Start from scratch</p>
                <ChevronRight className="absolute right-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <section className="mt-4 p-6 bg-accent/5 rounded-3xl border border-accent/20">
        <h4 className="font-bold text-accent-foreground flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" /> Pro Tip
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use the AI Assistant first to generate a slide-by-slide carousel plan, then head to the templates to make it look stunning!
        </p>
      </section>

      <MobileNav />
    </div>
  )
}
