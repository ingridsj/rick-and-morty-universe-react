import './index.scss'

export function Buttons ({prevDisabled, nextDisabled, prevOnclick, nextOnclick}) {
    return(
        <div className="Buttons">
        <button
          className="prev-button"
          disabled={prevDisabled}
          onClick={prevOnclick}
        >
          prev
        </button>
        <button
          className="next-button"
          disabled={nextDisabled}
          onClick={nextOnclick}
        >
          next
        </button>
      </div> 
    )
}