
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Plus, FolderHeart, Video, Image as ImageIcon } from "lucide-react"
import { MobileNav } from "@/components/layout/MobileNav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function ProjectsPage() {
  const projects = PlaceHolderImages.filter(img => img.id.startsWith('project-'))

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">Projects</h1>
          <p className="text-sm text-muted-foreground">{projects.length} saved drafts</p>
        </div>
        <Button size="icon" className="rounded-full shadow-lg">
           <Plus className="w-6 h-6" />
        </Button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="border-none shadow-sm overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4]">
                <Image
                  src={project.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute top-2 right-2">
                  <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/60 backdrop-blur-md border-none shadow-sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                {project.id.includes('project-1') && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Video className="w-2.5 h-2.5" /> REEL
                  </div>
                )}
                {project.id.includes('project-2') && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <ImageIcon className="w-2.5 h-2.5" /> POST
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm truncate">{project.description}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Edited 2 hours ago</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Link href="/create" className="border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground aspect-[3/4] hover:bg-muted/50 transition-colors">
          <div className="p-3 bg-muted rounded-full">
            <FolderHeart className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold">New Project</span>
        </Link>
      </div>

      <MobileNav />
    </div>
  )
}
