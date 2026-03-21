"use client"

import { useState } from "react"
import { Sparkles, Type, Film, Copy, Check, RotateCcw, LayoutPanelLeft, Hash, Mic, Youtube, Video, FileText, ListChecks, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/layout/MobileNav"
import { generateSocialMediaCaptions } from "@/ai/flows/generate-social-media-captions"
import { generateReelScriptOutline } from "@/ai/flows/generate-reel-script-outline"
import { generateCarouselContent } from "@/ai/flows/generate-carousel-content"
import { generateYoutubeScript, type GenerateYoutubeScriptOutput } from "@/ai/flows/generate-youtube-script"
import { useToast } from "@/hooks/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export default function AIGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [duration, setDuration] = useState([3]) // Default 3 minutes
  const [loading, setLoading] = useState(false)
  const [captions, setCaptions] = useState<string[]>([])
  const [script, setScript] = useState<any>(null)
  const [carouselData, setCarouselData] = useState<any>(null)
  const [youtubeData, setYoutubeData] = useState<GenerateYoutubeScriptOutput | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toast } = useToast()

  const handleGenerateCaptions = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
      const result = await generateSocialMediaCaptions({ 
        topic, 
        keywords: keywordsArray.length > 0 ? keywordsArray : undefined 
      })
      setCaptions(result.captions)
    } catch (error) {
      toast({ title: "Generation failed", description: "Try again later.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateScript = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const result = await generateReelScriptOutline({ topic, platform: 'YouTube Shorts', durationSeconds: 30 })
      setScript(result)
    } catch (error) {
      toast({ title: "Generation failed", description: "Try again later.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCarousel = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const result = await generateCarouselContent({ topic, platform: 'Instagram', slideCount: 5 })
      setCarouselData(result)
    } catch (error) {
      toast({ title: "Generation failed", description: "Try again later.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateYoutubeScript = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const result = await generateYoutubeScript({ topic, durationMinutes: duration[0] })
      setYoutubeData(result)
    } catch (error) {
      toast({ title: "Generation failed", description: "Try again later.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
    toast({ title: "Copied!", description: "Content copied to clipboard." })
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto pb-24">
      <header className="flex flex-col gap-2 pt-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-primary h-6 w-6" />
          AI Creator
        </h1>
        <p className="text-sm text-muted-foreground">Describe your idea, let AI handle the creative part.</p>
      </header>

      <section className="space-y-4 bg-white p-4 rounded-2xl shadow-sm border">
        <div className="space-y-2">
          <label className="text-sm font-semibold">What is your post about?</label>
          <Textarea 
            placeholder="E.g. 5 tips for better sleep, or My travel experience in Bali..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px] rounded-xl bg-background border-none ring-offset-background focus-visible:ring-primary"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-muted-foreground" />
            <label className="text-sm font-semibold">Keywords (optional)</label>
          </div>
          <Input 
            placeholder="E.g. fitness, healthy, lifestyle (comma separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="rounded-xl bg-background border-none ring-offset-background focus-visible:ring-primary"
          />
        </div>
      </section>

      <Tabs defaultValue="captions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl h-auto">
          <TabsTrigger value="captions" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Type className="w-4 h-4 mr-2 hidden sm:inline" />
            Captions
          </TabsTrigger>
          <TabsTrigger value="scripts" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Film className="w-4 h-4 mr-2 hidden sm:inline" />
            Reel
          </TabsTrigger>
          <TabsTrigger value="carousel" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <LayoutPanelLeft className="w-4 h-4 mr-2 hidden sm:inline" />
            Carousel
          </TabsTrigger>
          <TabsTrigger value="youtube" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Youtube className="w-4 h-4 mr-2 hidden sm:inline" />
            Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="captions" className="mt-4 space-y-4">
          <Button 
            onClick={handleGenerateCaptions} 
            disabled={loading || !topic} 
            className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {loading ? <RotateCcw className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Generate Captions
          </Button>

          {captions.length > 0 && (
            <div className="space-y-3">
              {captions.map((caption, idx) => (
                <Card key={idx} className="border-none shadow-sm overflow-hidden group">
                  <CardContent className="p-4 relative">
                    <p className="text-sm leading-relaxed pr-8 whitespace-pre-wrap">{caption}</p>
                    <button 
                      onClick={() => copyToClipboard(caption, idx)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scripts" className="mt-4 space-y-4">
          <Button 
            onClick={handleGenerateScript} 
            disabled={loading || !topic} 
            className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {loading ? <RotateCcw className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Generate Reel Outline
          </Button>

          {script && (
            <Card className="border-none shadow-sm">
              <CardHeader className="space-y-4">
                <CardTitle className="text-primary text-lg">{script.title}</CardTitle>
                
                {script.youtubeTitle && (
                  <div className="bg-muted/30 p-4 rounded-xl border space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-red-500 rounded p-1">
                        <Youtube className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">YouTube Shorts Meta</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground/60 block mb-0.5">OPTIMIZED TITLE</span>
                      <p className="text-sm font-medium leading-tight">{script.youtubeTitle}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground/60 block mb-0.5">DESCRIPTION</span>
                      <p className="text-[11px] text-muted-foreground whitespace-pre-wrap leading-relaxed">{script.youtubeDescription}</p>
                    </div>
                  </div>
                )}

                <div className="bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
                  <p className="text-sm font-semibold italic">" {script.hook} "</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {script.scenes.map((scene: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-muted pb-4 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary" />
                    <h4 className="font-bold text-sm mb-1 uppercase text-muted-foreground tracking-wider">Scene {idx + 1}</h4>
                    <p className="text-sm font-medium mb-3">{scene.description}</p>
                    
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mb-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Mic className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Voiceover Script</span>
                      </div>
                      <p className="text-sm italic text-foreground/80 leading-relaxed">"{scene.voiceover}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-muted/50 p-2 rounded">
                        <span className="font-bold opacity-50 block mb-1 uppercase">Audio/SFX</span>
                        {scene.audioSuggestion}
                      </div>
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="font-bold opacity-50 block mb-1 uppercase">On-Screen Text</span>
                        {scene.textOverlay}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-dashed">
                  <h4 className="font-bold text-xs text-muted-foreground mb-1 uppercase">Call to Action</h4>
                  <p className="text-sm font-bold text-primary">{script.callToAction}</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => copyToClipboard(JSON.stringify(script, null, 2), 999)}>
                  <Copy className="w-4 h-4 mr-2" /> Copy Full Script
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="carousel" className="mt-4 space-y-4">
          <Button 
            onClick={handleGenerateCarousel} 
            disabled={loading || !topic} 
            className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {loading ? <RotateCcw className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Generate Carousel Content
          </Button>

          {carouselData && (
            <div className="space-y-6">
               <div className="px-1">
                 <h3 className="font-bold text-lg mb-1">{carouselData.title}</h3>
                 <p className="text-xs text-muted-foreground">Swipe to preview slides</p>
               </div>

               <Carousel className="w-full max-w-xs mx-auto">
                 <CarouselContent>
                   {carouselData.slides.map((slide: any, idx: number) => (
                     <CarouselItem key={idx}>
                       <div className="p-1">
                         <Card className="aspect-square flex flex-col justify-center items-center p-6 text-center bg-primary/5 border-primary/20 border-2 rounded-3xl relative">
                           <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                             {idx + 1}
                           </span>
                           <h4 className="text-xl font-bold mb-3">{slide.headline}</h4>
                           <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{slide.bodyText}</p>
                           <div className="mt-auto pt-4 w-full border-t border-primary/10">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Visual Suggestion</p>
                              <p className="text-[9px] italic mt-1">{slide.visualIdea}</p>
                           </div>
                         </Card>
                       </div>
                     </CarouselItem>
                   ))}
                 </CarouselContent>
                 <div className="hidden sm:block">
                  <CarouselPrevious className="-left-12" />
                  <CarouselNext className="-right-12" />
                 </div>
               </Carousel>

               <Card className="bg-accent/5 border-none p-4 rounded-2xl">
                 <h4 className="font-bold text-xs text-accent-foreground mb-1 uppercase">Closing / CTA</h4>
                 <p className="text-sm font-bold text-primary">{carouselData.conclusion}</p>
               </Card>

               <Button 
                variant="outline" 
                className="w-full rounded-xl" 
                onClick={() => copyToClipboard(carouselData.slides.map((s: any) => `Slide ${s.slideNumber}: ${s.headline}\n${s.bodyText}`).join('\n\n'), 888)}
               >
                  <Copy className="w-4 h-4 mr-2" /> Copy Slide Text
               </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="youtube" className="mt-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Target Duration</span>
              </div>
              <span className="text-sm font-bold text-primary">{duration[0]} Minutes</span>
            </div>
            <Slider 
              value={duration} 
              onValueChange={setDuration} 
              max={10} 
              min={1} 
              step={1} 
            />
            <p className="text-[10px] text-muted-foreground italic">
              * The generator will create approx. {duration[0] * 10} sections (6s each) to fill this time.
            </p>
          </div>

          <Button 
            onClick={handleGenerateYoutubeScript} 
            disabled={loading || !topic} 
            className="w-full rounded-full h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {loading ? <RotateCcw className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Generate Long Video Script
          </Button>

          {youtubeData && (
            <div className="space-y-6">
              <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-red-500 text-white p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Youtube className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-widest">YouTube Video Strategy</span>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight">{youtubeData.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm border-b pb-2">
                      <FileText className="w-4 h-4" /> SEO Metadata
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Description & Timestamps</span>
                        <div className="mt-1 bg-muted/30 p-3 rounded-lg text-xs leading-relaxed whitespace-pre-wrap">
                          {youtubeData.description}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {youtubeData.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] font-medium">#{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm border-b pb-2">
                      <ListChecks className="w-4 h-4" /> Script Walkthrough (6s Pacing)
                    </div>
                    <div className="space-y-4">
                      {youtubeData.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px]">{idx + 1}</span>
                              Section
                            </h4>
                            <Badge variant="outline" className="text-[9px] h-5">~6 SEC</Badge>
                          </div>
                          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                            <p className="text-sm leading-relaxed mb-3 italic">"{section.content}"</p>
                            <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-white/50 p-2 rounded border border-dashed">
                              <Video className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span className="italic">Visual: {section.visualCues}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-dashed">
                    <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                      <h4 className="font-bold text-xs text-accent-foreground mb-2 uppercase">Outro & CTA</h4>
                      <p className="text-sm mb-3 leading-relaxed">{youtubeData.outro.content}</p>
                      <p className="text-[10px] font-medium text-accent-foreground italic flex items-center gap-1.5">
                        <Video className="w-3 h-3" /> {youtubeData.outro.closingAction}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full rounded-xl" onClick={() => copyToClipboard(JSON.stringify(youtubeData, null, 2), 777)}>
                    <Copy className="w-4 h-4 mr-2" /> Copy Full Project Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <MobileNav />
    </div>
  )
}
