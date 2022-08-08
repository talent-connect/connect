import confetti from 'canvas-confetti'
import mousetrap from './mousetrap'

const duration = 10 * 1000
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

interface UseConfettiConfig {
  keybind?: string
}

const defaultUseConfettiConfig = {
  keybind: 'c o n f e t t i',
}

export function useConfetti(
  config: UseConfettiConfig = defaultUseConfettiConfig
) {
  mousetrap.bind(config.keybind || 'r e d i c o n f e t t i', function () {
    const animationEnd = Date.now() + duration

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 250 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      )
    }, 250)
  })
}
