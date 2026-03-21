
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Video, Image as ImageIcon, ChevronRight } from "lucide-react"
import { MobileNav } from "@/components/layout/MobileNav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function HomePage() {
  const recentProjects = PlaceHolderImages.filter(img => img.id.startsWith('project-'))

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">ClipCraft</h1>
          <p className="text-sm text-muted-foreground">Make something amazing today.</p>
        </div>
        <div className="bg-accent/20 p-2 rounded-full">
          <Sparkles className="text-accent h-6 w-6" />
        </div>
      </header>

      {/* Quick Start Actions */}
      <section className="grid grid-cols-2 gap-3">
        <Link href="/create?type=reel" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white overflow-hidden border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Video className="text-primary h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">New Reel</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/create?type=post" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white overflow-hidden border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="bg-accent/10 p-3 rounded-xl">
                <ImageIcon className="text-accent h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">New Post</span>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* AI Inspiration Banner */}
      <section>
        <Link href="/create/ai">
          <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-accent p-6 flex flex-col justify-center text-white group">
            <h3 className="text-lg font-bold flex items-center gap-2">
              Need Ideas? <Sparkles className="h-5 w-5 animate-pulse" />
            </h3>
            <p className="text-sm text-white/80 max-w-[200px]">Generate scripts and captions with AI in seconds.</p>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Recent Projects */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Projects</h2>
          <Link href="/projects" className="text-xs text-primary font-medium hover:underline">View All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex-shrink-0 w-32 flex flex-col gap-1">
              <div className="relative aspect-[3/4] w-32 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={project.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover"
                  data-ai-hint={project.imageHint}
                />
              </div>
              <span className="text-[10px] font-medium truncate px-1">{project.description}</span>
            </div>
          ))}
          {recentProjects.length === 0 && (
            <div className="w-full h-32 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl italic text-sm">
              No projects yet. Start creating!
            </div>
          )}
        </div>
      </section>

      {/* Featured Templates Snippet */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Try a Template</h2>
          <Link href="/templates" className="text-xs text-primary font-medium hover:underline">See Library</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PlaceHolderImages.filter(img => img.id.startsWith('reel-template-')).map((template) => (
            <div key={template.id} className="relative aspect-[9/16] rounded-xl overflow-hidden group shadow-sm">
              <Image
                src={template.imageUrl}
                alt={template.description}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                data-ai-hint={template.imageHint}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-3 left-3 right-3">
                <Button size="sm" className="w-full bg-white text-black hover:bg-white/90 rounded-full h-8 text-[10px]">
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
