'use client'
import { useEffect, useState } from 'react'
import { CUSTOM_EVENTS } from '../../api/ApiTypes.d'
import { useCoflCoins } from '../../utils/Hooks'
import { getLoadingElement } from '../../utils/LoadingUtils'
import Number from '../Number/Number'
import styles from './CoflCoinsDisplay.module.css'
import { toast } from 'react-toastify'

export function CoflCoinsDisplay() {
    let coflCoins = useCoflCoins()
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadCoflCoins()
        document.addEventListener(CUSTOM_EVENTS.FLIP_SETTINGS_CHANGE, loadCoflCoins)

        return () => {
            document.removeEventListener(CUSTOM_EVENTS.FLIP_SETTINGS_CHANGE, loadCoflCoins)
        }
    }, [])

    useEffect(() => {
        if (coflCoins !== -1) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [coflCoins])

    function loadCoflCoins() {}

    if (isNaN(coflCoins) || coflCoins === undefined || coflCoins === null) {
        console.error('coflCoins is not a number')
        console.error(coflCoins)
        toast.error('Something went wrong while loading your CoflCoins. Please try again.')
    }

    return (
        <div className="cofl-coins-display">
            <fieldset className={styles.border} style={{ width: 'max-content', borderRadius: '15px', textAlign: 'center' }}>
                {isLoading ? (
                    getLoadingElement(<span />)
                ) : (
                    <b style={{ fontSize: 'x-large' }}>
                        Balance: <Number number={coflCoins} /> CoflCoins
                    </b>
                )}
            </fieldset>
        </div>
    )
}
