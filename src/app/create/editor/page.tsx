"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { 
  ChevronLeft, 
  Download, 
  Share2, 
  Type, 
  Image as ImageIcon, 
  Layers, 
  Sticker,
  Check,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { PlaceHolderImages } from "@/lib/placeholder-images"

function EditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  
  // Find template or fallback to the first one. If none exist, use a hardcoded fallback to prevent crash.
  const template = PlaceHolderImages.find(img => img.id === templateId) || PlaceHolderImages[0] || {
    id: 'fallback',
    imageUrl: 'https://picsum.photos/seed/fallback/400/700',
    description: 'Default Template',
    imageHint: 'default lifestyle'
  };
  
  const { toast } = useToast()
  const [text, setText] = useState("Tap to edit text")
  const [fontSize, setFontSize] = useState([24])
  const [isExporting, setIsExporting] = useState(false)
  const [activeLayer, setActiveLayer] = useState<'text' | 'image' | 'filters'>('text')

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export Successful",
        description: "Your creation has been saved to your gallery.",
      })
    }, 2000)
  }

  const handleShare = () => {
    toast({
      title: "Opening Share Sheet",
      description: "Sharing to Instagram...",
    })
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md z-10">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-white bg-white/10" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Check className="h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-2" />}
            {isExporting ? "Done" : "Save"}
          </Button>
        </div>
      </header>

      {/* Editor Canvas */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        <div className="relative w-full max-w-[360px] aspect-[9/16] bg-muted rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src={template.imageUrl}
            alt={template.description}
            fill
            className="object-cover"
            data-ai-hint={template.imageHint}
          />
          
          {/* Draggable/Editable Text Mockup */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-6 pointer-events-none"
            style={{ fontSize: `${fontSize[0]}px` }}
          >
            <span className="font-bold text-white drop-shadow-lg inline-block py-2 px-4 rounded-lg outline-none focus:ring-2 ring-primary">
              {text}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-3xl p-6 pb-10 space-y-6">
        <div className="flex justify-around items-center border-b pb-4">
          <button 
            onClick={() => setActiveLayer('text')}
            className={`flex flex-col items-center gap-1 ${activeLayer === 'text' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Type className="w-6 h-6" />
            <span className="text-[10px] font-bold">TEXT</span>
          </button>
          <button 
            onClick={() => setActiveLayer('image')}
            className={`flex flex-col items-center gap-1 ${activeLayer === 'image' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <ImageIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">MEDIA</span>
          </button>
          <button 
             onClick={() => setActiveLayer('filters')}
             className={`flex flex-col items-center gap-1 ${activeLayer === 'filters' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Layers className="w-6 h-6" />
            <span className="text-[10px] font-bold">FILTERS</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Sticker className="w-6 h-6" />
            <span className="text-[10px] font-bold">STICKERS</span>
          </button>
        </div>

        {activeLayer === 'text' && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-muted border-none rounded-xl h-12 px-4 text-sm focus:ring-2 ring-primary"
                placeholder="Enter text..."
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>FONT SIZE</span>
                <span>{fontSize[0]}px</span>
              </div>
              <Slider 
                value={fontSize} 
                onValueChange={setFontSize} 
                max={60} 
                min={12} 
                step={1} 
              />
            </div>
          </div>
        )}

        {activeLayer === 'image' && (
          <div className="grid grid-cols-4 gap-2">
             <div className="aspect-square bg-muted rounded-xl flex items-center justify-center cursor-pointer border-2 border-dashed border-primary/40 hover:bg-primary/5">
                <Plus className="w-6 h-6 text-primary" />
             </div>
             {[1,2,3].map(n => (
                <div key={n} className="aspect-square bg-muted rounded-xl overflow-hidden relative">
                   <Image src={`https://picsum.photos/seed/${n+50}/100/100`} alt="Media item" fill className="object-cover" />
                </div>
             ))}
          </div>
        )}

        {activeLayer === 'filters' && (
           <div className="flex gap-4 overflow-x-auto pb-2">
              {['Original', 'Vintage', 'B&W', 'Dreamy', 'Pop'].map(filter => (
                 <div key={filter} className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-14 h-14 bg-muted rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer">
                       <Image src={template.imageUrl} alt={filter} width={56} height={56} className="object-cover" />
                    </div>
                    <span className="text-[10px] font-bold">{filter}</span>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white">Loading Editor...</div>}>
      <EditorContent />
    </Suspense>
  )
}