const getTouchPos = (canvasDom: any, touchEvent: any) => {
   let rect = canvasDom.getBoundingClientRect()
   return {
      posx: touchEvent.touches[0].clientX - rect.left,
      posy: touchEvent.touches[0].clientY - rect.top,
   }
}

export const startDrawing = (e: any, contextRef: any, setIsDrawing: any) => {
   const { offsetX, offsetY } = e.nativeEvent
   contextRef.current.beginPath()
   contextRef.current.moveTo(offsetX, offsetY)
   setIsDrawing(true)
}

export const startDrawingMobile = (e: any, contextRef: any, canvasRef: any, setIsDrawing: any) => {
   const ctx = contextRef.current
   const { posx, posy } = getTouchPos(canvasRef.current, e)
   ctx.beginPath()
   ctx.moveTo(posx, posy)
   setIsDrawing(true)
}

export const draw = (e: any, contextRef: any, canvasRef: any, isDrawing: any) => {
   if (!isDrawing) {
      console.log(canvasRef)
      return
   }
   const { offsetX, offsetY } = e.nativeEvent
   contextRef.current.lineTo(offsetX, offsetY)
   contextRef.current.stroke()
}

export const drawMobile = (e: any, contextRef: any, canvasRef: any, isDrawing: any) => {
   if (!isDrawing) {
      return
   }
   const ctx = contextRef.current
   const { posx, posy } = getTouchPos(canvasRef.current, e)
   ctx.lineTo(posx, posy)
   ctx.stroke()
}

export const finishDrawing = (contextRef: any, setIsDrawing: any) => {
   contextRef.current.closePath()
   setIsDrawing(false)
}
