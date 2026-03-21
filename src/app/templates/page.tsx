
import Image from "next/image"
import Link from "next/link"
import { Search, Layout, Video, Instagram, Facebook } from "lucide-react"
import { MobileNav } from "@/components/layout/MobileNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function TemplatesPage() {
  const reelTemplates = PlaceHolderImages.filter(img => img.id.startsWith('reel-template-'))
  const postTemplates = PlaceHolderImages.filter(img => img.id.startsWith('post-template-'))

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex flex-col gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-headline">Library</h1>
          <p className="text-sm text-muted-foreground">Pick a format to start creating.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9 bg-white border-none rounded-xl h-11 shadow-sm focus-visible:ring-primary"
          />
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent gap-2 h-auto flex flex-wrap">
          <TabsTrigger value="all" className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary px-4 py-2 text-xs">All</TabsTrigger>
          <TabsTrigger value="reels" className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary px-4 py-2 text-xs flex items-center gap-1">
            <Video className="w-3 h-3" /> Reels
          </TabsTrigger>
          <TabsTrigger value="posts" className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary px-4 py-2 text-xs flex items-center gap-1">
            <Layout className="w-3 h-3" /> Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-8">
          <section className="space-y-3">
            <h3 className="font-bold text-sm">Recommended for you</h3>
            <div className="grid grid-cols-2 gap-3">
              {[...reelTemplates, ...postTemplates].map((template) => (
                <Link key={template.id} href={`/create/editor?template=${template.id}`} className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-white/50">
                    <Image
                      src={template.imageUrl}
                      alt={template.description}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      data-ai-hint={template.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {template.id.includes('reel') ? (
                         <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-full"><Video className="w-3 h-3 text-white" /></div>
                      ) : (
                         <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-full"><Instagram className="w-3 h-3 text-white" /></div>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] mt-2 font-medium text-muted-foreground truncate px-1">{template.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="reels" className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            {reelTemplates.map((template) => (
              <Link key={template.id} href={`/create/editor?template=${template.id}`} className="group">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={template.imageUrl}
                    alt={template.description}
                    fill
                    className="object-cover"
                    data-ai-hint={template.imageHint}
                  />
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            {postTemplates.map((template) => (
              <Link key={template.id} href={`/create/editor?template=${template.id}`} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={template.imageUrl}
                    alt={template.description}
                    fill
                    className="object-cover"
                    data-ai-hint={template.imageHint}
                  />
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <MobileNav />
    </div>
  )
}
