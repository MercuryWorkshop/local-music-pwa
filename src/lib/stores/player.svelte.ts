import { getContext, setContext } from 'svelte'
import invariant from 'tiny-invariant'

class Queue {
	shuffle = $state(false)

	currentIndex = $state(-1)

	#itemsIdsOriginalOrder = $state([])
	#itemsIdsShuffled = $state([])

	itemsIds = $derived(this.shuffle ? this.#itemsIdsShuffled : this.#itemsIdsOriginalOrder)
}

class PlayerStore {
	playing = $state(false)
	currentTime = $state(0)

	togglePlay = () => {
		this.playing = !this.playing
	}

	play = () => {
		this.playing = true
	}

	pause = () => {
		this.playing = false
	}

	playNext = () => {
		console.log('playNext')
	}

	playPrev = () => {
		console.log('playPrev')
	}
}

const playerContext = Symbol('player')

export const providePlayer = () => {
	setContext(playerContext, new PlayerStore())
}

export const usePlayer = () => {
	const player = getContext<PlayerStore>(playerContext)

	invariant(player, 'No player found')

	return player
}
