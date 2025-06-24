'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'

const StopWatch = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const formateTime = (time : number) =>{
        const minute = Math.floor(time / 60000);
        const sec = Math.floor((time % 60000) / 1000)
        return `${minute} min : ${sec} s : ${((time % 1000)/10)} ms`
    }

  useEffect(()=>{
    if(isRunning){
        intervalRef.current = setInterval(() => {
            setTime(prev => prev + 10)
        }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  })

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {setTime(0) ; setIsRunning(false)}

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-xl">{formateTime(time)}</div>
      <div className="flex gap-2">
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Stop</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  )
}

export default StopWatch
