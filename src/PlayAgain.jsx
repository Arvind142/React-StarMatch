const PlayAgain = (props) => {
    return (
        <>
            <div className='game-done'>
                <div className="message">
                    {props.gameStatus === 'lost' ? "Game Over" : "Nice!"}
                </div>
                <button onClick={props.resetMethod}>Play Again</button>
            </div>
        </>
    )
}

export default PlayAgain;