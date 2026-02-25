'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Box, Button, Flex, Group } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'
import { Trash2, Undo } from 'lucide-react'

interface Point {
   x: number
   y: number
   pressure?: number
}

interface Stroke {
   points: Point[]
}

const STROKE_COLOR = 'hsl(220, 15%, 12%)'
const STROKE_WIDTH = 2.5
const BASELINE_COLOR = 'hsl(220, 13%, 85%)'

function drawSmoothLine(ctx: CanvasRenderingContext2D, points: Point[]) {
   if (points.length < 2) {
      if (points.length === 1) {
         ctx.beginPath()
         ctx.arc(points[0].x, points[0].y, STROKE_WIDTH / 2, 0, Math.PI * 2)
         ctx.fillStyle = STROKE_COLOR
         ctx.fill()
      }
      return
   }

   ctx.beginPath()
   ctx.strokeStyle = STROKE_COLOR
   ctx.lineWidth = STROKE_WIDTH
   ctx.lineCap = 'round'
   ctx.lineJoin = 'round'
   ctx.moveTo(points[0].x, points[0].y)

   for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2
      const midY = (points[i].y + points[i + 1].y) / 2
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY)
   }

   const last = points[points.length - 1]
   ctx.lineTo(last.x, last.y)
   ctx.stroke()
}

function drawBaseline(ctx: CanvasRenderingContext2D, width: number, height: number) {
   const y = height * 0.72
   const padding = 32
   ctx.save()
   ctx.beginPath()
   ctx.setLineDash([5, 4])
   ctx.strokeStyle = BASELINE_COLOR
   ctx.lineWidth = 1
   ctx.moveTo(padding, y)
   ctx.lineTo(width - padding, y)
   ctx.stroke()
   ctx.restore()
}

export function CanvasDrawer({ onSave }: { onSave: (sign: any) => void }) {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const wrapperRef = useRef<HTMLDivElement>(null)
   const [isDrawing, setIsDrawing] = useState(false)
   const [strokes, setStrokes] = useState<Stroke[]>([])
   const [currentStroke, setCurrentStroke] = useState<Point[]>([])
   const [isEmpty, setIsEmpty] = useState(true)
   const [savedImage, setSavedImage] = useState<string | null>(null)
   const dprRef = useRef(1)

   const getPoint = useCallback((e: React.MouseEvent | React.TouchEvent): Point | null => {
      const canvas = canvasRef.current
      if (!canvas) return null
      const rect = canvas.getBoundingClientRect()
      if ('touches' in e) {
         const touch = e.touches[0]
         if (!touch) return null
         return {
            x: (touch.clientX - rect.left) * dprRef.current,
            y: (touch.clientY - rect.top) * dprRef.current,
         }
      }
      return {
         x: (e.clientX - rect.left) * dprRef.current,
         y: (e.clientY - rect.top) * dprRef.current,
      }
   }, [])

   const redraw = useCallback((allStrokes: Stroke[], activePoints?: Point[]) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cssWidth = canvas.width / dprRef.current
      const cssHeight = canvas.height / dprRef.current

      ctx.save()
      ctx.scale(dprRef.current, dprRef.current)
      drawBaseline(ctx, cssWidth, cssHeight)

      for (const stroke of allStrokes) {
         drawSmoothLine(ctx, stroke.points)
      }
      if (activePoints && activePoints.length > 0) {
         drawSmoothLine(ctx, activePoints)
      }
      ctx.restore()
   }, [])

   const setupCanvas = useCallback(() => {
      const canvas = canvasRef.current
      const wrapper = wrapperRef.current
      if (!canvas || !wrapper) return

      const dpr = window.devicePixelRatio || 1
      dprRef.current = dpr
      const rect = wrapper.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      redraw(strokes)
   }, [strokes, redraw])

   useEffect(() => {
      setupCanvas()
      window.addEventListener('resize', setupCanvas)
      return () => window.removeEventListener('resize', setupCanvas)
   }, [setupCanvas])

   const handleStart = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
         e.preventDefault()
         const pt = getPoint(e)
         if (!pt) return
         setIsDrawing(true)
         setCurrentStroke([pt])
      },
      [getPoint],
   )

   const handleMove = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
         e.preventDefault()
         if (!isDrawing) return
         const pt = getPoint(e)
         if (!pt) return
         setCurrentStroke(prev => {
            const next = [...prev, pt]
            redraw(strokes, next)
            return next
         })
      },
      [isDrawing, getPoint, strokes, redraw],
   )

   const handleEnd = useCallback(() => {
      if (!isDrawing) return
      setIsDrawing(false)
      if (currentStroke.length > 0) {
         setStrokes(prev => [...prev, { points: currentStroke }])
         setIsEmpty(false)
      }
      setCurrentStroke([])
   }, [isDrawing, currentStroke])

   const handleUndo = useCallback(() => {
      setStrokes(prev => {
         const next = prev.slice(0, -1)
         if (next.length === 0) setIsEmpty(true)
         redraw(next)
         return next
      })
      setSavedImage(null)
   }, [redraw])

   const handleClear = useCallback(() => {
      setStrokes([])
      setCurrentStroke([])
      setIsEmpty(true)
      setSavedImage(null)
      redraw([])
   }, [redraw])

   const handleSave = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas || isEmpty) return

      // Create a clean export canvas without the baseline
      const exportCanvas = document.createElement('canvas')
      exportCanvas.width = canvas.width
      exportCanvas.height = canvas.height
      const ctx = exportCanvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

      ctx.save()
      ctx.scale(dprRef.current, dprRef.current)
      for (const stroke of strokes) {
         drawSmoothLine(ctx, stroke.points)
      }
      ctx.restore()

      setSavedImage(exportCanvas.toDataURL('image/png'))
   }, [isEmpty, strokes])

   useEffect(() => {
      onSave(savedImage)
   }, [savedImage])

   // const handleDownload = useCallback(() => {
   //    if (!savedImage) return
   //    const link = document.createElement('a')
   //    link.download = 'signature.png'
   //    link.href = savedImage
   //    link.click()
   // }, [savedImage])

   return (
      <Box w="100%">
         <Box style={{ border: '1px dashed var(--mantine-color-gray-4)' }} bdrs="sm">
            <Flex direction="column" gap="12px">
               {/* Drawing area */}
               <div ref={wrapperRef}>
                  <canvas
                     ref={canvasRef}
                     className="absolute inset-0 touch-none"
                     role="img"
                     aria-label="Signature drawing area"
                     tabIndex={0}
                     onMouseDown={handleStart}
                     onMouseMove={handleMove}
                     onMouseUp={handleEnd}
                     onMouseLeave={handleEnd}
                     onTouchStart={handleStart}
                     onTouchMove={handleMove}
                     onTouchEnd={handleEnd}
                  />
               </div>

               {/* Saved preview */}
               {/*{savedImage && (*/}
               {/*   <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4">*/}
               {/*      <div className="flex items-center justify-between">*/}
               {/*         <p className="text-sm font-medium text-foreground">Saved Signature</p>*/}
               {/*         <Button variant="outline" size="sm" onClick={handleDownload}>*/}
               {/*            <svg*/}
               {/*               xmlns="http://www.w3.org/2000/svg"*/}
               {/*               width="16"*/}
               {/*               height="16"*/}
               {/*               viewBox="0 0 24 24"*/}
               {/*               fill="none"*/}
               {/*               stroke="currentColor"*/}
               {/*               strokeWidth="2"*/}
               {/*               strokeLinecap="round"*/}
               {/*               strokeLinejoin="round"*/}
               {/*               aria-hidden="true">*/}
               {/*               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />*/}
               {/*               <polyline points="7 10 12 15 17 10" />*/}
               {/*               <line x1="12" x2="12" y1="15" y2="3" />*/}
               {/*            </svg>*/}
               {/*            Download PNG*/}
               {/*         </Button>*/}
               {/*      </div>*/}
               {/*      <div className="rounded-md border border-border bg-card p-3">*/}
               {/*         <img*/}
               {/*            src={savedImage || '/placeholder.svg'}*/}
               {/*            alt="Your saved signature"*/}
               {/*            className="w-full h-auto max-h-28 object-contain"*/}
               {/*         />*/}
               {/*      </div>*/}
               {/*   </div>*/}
               {/*)}*/}
            </Flex>
         </Box>

         <Box pt="md">
            <Flex justify="space-between" align="center">
               <Group align="center" gap="sm">
                  <Button
                     variant="outline"
                     onClick={handleUndo}
                     disabled={isEmpty}
                     color="gray.5"
                     aria-label="Undo last stroke">
                     <Undo size={20} />
                  </Button>
                  <Button
                     variant="outline"
                     onClick={handleClear}
                     disabled={isEmpty}
                     color="gray.5"
                     aria-label="Clear all strokes">
                     <Trash2 size={20} />
                  </Button>
               </Group>
               <Button onClick={handleSave} disabled={isEmpty} w="20%" variant="outline">
                  <I18nLabel label="action.ok" />
               </Button>
            </Flex>
         </Box>
      </Box>
   )
}
