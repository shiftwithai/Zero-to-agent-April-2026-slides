"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, Users, Zap, BookOpen, Heart, Sparkles, Laptop, Lightbulb, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"

const slides = [
  { id: "title", component: TitleSlide },
  { id: "agenda", component: AgendaSlide },
  { id: "zero-to-agent", component: ZeroToAgentSlide },
  { id: "rootly", component: RootlySlide },
  { id: "makerslounge", component: MakersLoungeSlide },
  { id: "hosts", component: HostsSlide },
  { id: "lets-build", component: LetsBuildSlide },
]

export function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Slide Content */}
      <div className="h-full w-full">
        <CurrentSlideComponent />
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 text-sm text-muted-foreground">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      {/* Logos row */}
      <div className="flex items-center gap-6 mb-12">
        <VercelLogo />
        <span className="text-muted-foreground text-2xl">×</span>
        <RootlyLogo />
        <span className="text-muted-foreground text-2xl">×</span>
        <MakersLoungeLogo />
      </div>

      <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
        Zero to <span className="text-primary">Agent</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
        Build and launch real AI agents in under two hours
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Toronto</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Thursday, May 1st</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>5:30 PM - 8:30 PM</span>
        </div>
      </div>

      <div className="mt-12 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
        Part of Vercel Global Build Week
      </div>
    </div>
  )
}

function AgendaSlide() {
  const agendaItems = [
    { time: "5:30 - 6:30 PM", title: "Check-in & Networking", description: "Food & drinks provided", icon: Users },
    { time: "6:30 - 7:30 PM", title: "Hands-on Building", description: "Build with v0", icon: Laptop },
    { time: "7:30 - 8:30 PM", title: "Demos & Wrap-up", description: "Show what you built", icon: Rocket },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Tonight&apos;s Agenda</h2>
      
      <div className="w-full max-w-2xl space-y-6">
        {agendaItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary font-medium mb-1">{item.time}</p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ZeroToAgentSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <div className="mb-8">
        <VercelLogo large />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Global Build Week</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        A global initiative bringing together builders from cities around the world to design, build, and deploy AI agents.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
        <div className="p-6 rounded-2xl bg-card border border-border text-center">
          <p className="text-3xl font-bold text-primary mb-2">April 24 - May 3</p>
          <p className="text-muted-foreground">Competition Window</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border text-center">
          <p className="text-3xl font-bold text-primary mb-2">$6,000+</p>
          <p className="text-muted-foreground">In Prizes</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border text-center">
          <p className="text-3xl font-bold text-primary mb-2">Global</p>
          <p className="text-muted-foreground">Community Recognition</p>
        </div>
      </div>

      <p className="mt-10 text-muted-foreground">
        Submit your projects to the global competition for prizes and visibility
      </p>
    </div>
  )
}

function RootlySlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <div className="mb-8">
        <RootlyLogo large />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">AI SRE Agents</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        The AI-native on-call and incident response platform that resolves your hardest incidents faster.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mb-10">
        {["Root Cause Analysis", "Pattern Detection", "Always-on Copilot", "Continuous Improvement"].map((feature) => (
          <div key={feature} className="p-4 rounded-xl bg-card border border-border">
            <p className="text-sm font-medium">{feature}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
        <span>LinkedIn</span>
        <span>•</span>
        <span>NVIDIA</span>
        <span>•</span>
        <span>Replit</span>
        <span>•</span>
        <span>Canva</span>
        <span>•</span>
        <span>Figma</span>
        <span>•</span>
        <span>Dropbox</span>
      </div>
    </div>
  )
}

function MakersLoungeSlide() {
  const values = [
    { icon: Zap, title: "Hustle", description: "Ship fast, iterate often" },
    { icon: BookOpen, title: "Learning", description: "Grow by sharing knowledge" },
    { icon: Heart, title: "Community", description: "Your win is our win" },
    { icon: Sparkles, title: "Fun", description: "Celebrate the joy of creating" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <div className="mb-8">
        <MakersLoungeLogo large />
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-2">Where <span className="text-primary">Makers</span> Build Together</h2>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        A Toronto-based community for founders, developers, and creators who are actively building something.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {values.map((value) => (
          <div key={value.title} className="p-6 rounded-2xl bg-card border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <value.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{value.title}</h3>
            <p className="text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function HostsSlide() {
  const hosts = [
    {
      name: "Hakan Orunlu",
      image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/qv/d257a267-2a5a-4590-b03e-e79e756b022b.png",
      role: "Ecommerce & AI Automation Manager",
      company: "Proax Technologies",
      companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQH26ch_0LKmEQ/company-logo_200_200/company-logo_200_200/0/1631373701820?e=1778716800&v=beta&t=Pi28AKCn-mwU2wRn40uzmcPtNVOvAxbMTi1V2AEEd8A",
      bio: "",
    },
    {
      name: "Berto Mill",
      image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/rk/3357ea12-8f0d-4b68-b55b-c04df0916aae.jpg",
      role: "Go-to-Market Lead",
      company: "Aucctus AI",
      companyLogo: "https://media.licdn.com/dms/image/v2/D4D0BAQHb9hsG307GBA/company-logo_200_200/company-logo_200_200/0/1736787086978/aucctus_logo?e=1778716800&v=beta&t=NKj73M9zQ14E3uuX4gX9_uzYw732xnL7JXRatUHCQa0",
      bio: "",
    },
    {
      name: "Anastasiia Konovalenko",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFFBzeZ3ic7iw/profile-displayphoto-crop_800_800/B4EZxFoxQoJAAI-/0/1770694841873?e=1778716800&v=beta&t=CLR32s3jpra3PNNwQKvRiOvicCL9JponrXmiETiqH7Y",
      role: "Office & Community Manager",
      company: "Rootly AI",
      companyLogo: "https://media.licdn.com/dms/image/v2/D4D0BAQEF47uwga4CzQ/company-logo_200_200/B4DZpPoflBGwAI-/0/1762272606899/rootlyhq_logo?e=1778716800&v=beta&t=U3EHW1ZjEHgJUiHmf04_J-YYAH-XGVDNIK3YQYiy5ho",
      bio: "",
    },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Your Hosts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {hosts.map((host, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Circular image */}
            <div className="mb-4 relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 bg-muted">
              <img 
                src={host.image} 
                alt={host.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name */}
            <h3 className="text-xl font-semibold mb-3">{host.name}</h3>
            
            {/* Company logo and role */}
            <div className="mb-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-primary/10 flex items-center justify-center">
                <img 
                  src={host.companyLogo} 
                  alt={host.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p className="font-medium">{host.role}</p>
                <p>{host.company}</p>
              </div>
            </div>
            
            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed">{host.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LetsBuildSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <h2 className="text-5xl md:text-7xl font-bold mb-6">Let&apos;s Build!</h2>
      
      <p className="text-xl text-muted-foreground max-w-xl mb-10">
        Scan to register and submit your project
      </p>

      <div className="p-6 bg-white rounded-2xl mb-8">
        <QRCodeSVG 
          value="https://zerotoagent.dev/event/RbeBMcn9EPsyxEld"
          size={200}
          level="H"
          includeMargin={false}
        />
      </div>

      <p className="text-sm text-muted-foreground mb-10">
        zerotoagent.dev/event/RbeBMcn9EPsyxEld
      </p>

      <div className="flex flex-col gap-3 text-left max-w-md w-full">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">1</span>
          </div>
          <p>Open <span className="text-primary font-medium">v0.dev</span> and start building</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">2</span>
          </div>
          <p>Build your AI agent idea</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">3</span>
          </div>
          <p>Deploy and demo at 7:30!</p>
        </div>
      </div>
    </div>
  )
}

// Logo Components
function VercelLogo({ large }: { large?: boolean }) {
  const size = large ? "h-12" : "h-8"
  return (
    <svg className={size} viewBox="0 0 283 64" fill="currentColor">
      <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"/>
    </svg>
  )
}

function RootlyLogo({ large }: { large?: boolean }) {
  const size = large ? "text-4xl" : "text-2xl"
  return (
    <div className={`${size} font-bold flex items-center gap-2`}>
      <span className="text-foreground">rootly</span>
      <span className="text-muted-foreground font-light">ai</span>
    </div>
  )
}

function MakersLoungeLogo({ large }: { large?: boolean }) {
  const iconSize = large ? "h-10 w-10" : "h-6 w-6"
  const textSize = large ? "text-3xl" : "text-xl"
  return (
    <div className="flex items-center gap-2">
      <svg className={`${iconSize} text-primary`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      <span className={`${textSize} font-medium`}>makerslounge</span>
    </div>
  )
}
